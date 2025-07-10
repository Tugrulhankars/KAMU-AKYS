using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AntrenorEgitimTakip.API.Services
{
    public interface IEgitimService
    {
        Task<List<Egitim>> GetAllEgitimlerAsync();
        Task<Egitim?> GetEgitimByIdAsync(int id);
        Task<Egitim> CreateEgitimAsync(Egitim egitim);
        Task<Egitim> UpdateEgitimAsync(Egitim egitim);
        Task<bool> DeleteEgitimAsync(int id);
        Task<List<Egitim>> GetAktifEgitimlerAsync();
        Task<List<Egitim>> GetEgitimlerByKategoriAsync(int kategoriId);
        Task<List<EgitimKategori>> GetAllKategorilerAsync();
        Task<EgitimKategori?> GetKategoriByIdAsync(int id);
        Task<EgitimKategori> CreateKategoriAsync(EgitimKategori kategori);
        Task<EgitimKategori> UpdateKategoriAsync(EgitimKategori kategori);
        Task<bool> DeleteKategoriAsync(int id);
        Task<List<EgitimModul>> GetEgitimModulleriAsync(int egitimId);
        Task<EgitimModul> CreateModulAsync(EgitimModul modul);
        Task<EgitimModul> UpdateModulAsync(EgitimModul modul);
        Task<bool> DeleteModulAsync(int id);
        Task<List<EgitimIcerik>> GetModulIcerikleriAsync(int modulId);
        Task<EgitimIcerik> CreateIcerikAsync(EgitimIcerik icerik);
        Task<EgitimIcerik> UpdateIcerikAsync(EgitimIcerik icerik);
        Task<bool> DeleteIcerikAsync(int id);
        Task<List<EgitimKayit>> GetEgitimKayitlariAsync(int egitimId);
        Task<EgitimKayit> CreateEgitimKayitAsync(EgitimKayit kayit);
        Task<EgitimKayit> UpdateEgitimKayitAsync(EgitimKayit kayit);
        Task<bool> DeleteEgitimKayitAsync(int id);
        Task<List<EgitimKayit>> GetAntrenorEgitimKayitlariAsync(int antrenorId);
        Task<List<EgitimTamamlama>> GetEgitimTamamlamalarAsync(int kayitId);
        Task<EgitimTamamlama> CreateTamamlamaAsync(EgitimTamamlama tamamlama);
        Task<List<EgitimDevam>> GetEgitimDevamlarAsync(int kayitId);
        Task<EgitimDevam> CreateDevamAsync(EgitimDevam devam);
        Task<List<EgitimNot>> GetEgitimNotlarAsync(int kayitId);
        Task<EgitimNot> CreateNotAsync(EgitimNot not);
        Task<bool> DeleteNotAsync(int id);
    }

    public class EgitimService : IEgitimService
    {
        private readonly ApplicationDbContext _context;

        public EgitimService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Egitim>> GetAllEgitimlerAsync()
        {
            return await _context.Egitimler
                .Include(e => e.Kategori)
                .Include(e => e.Moduller)
                .Include(e => e.EgitimKayitlari)
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
        }

        public async Task<Egitim?> GetEgitimByIdAsync(int id)
        {
            return await _context.Egitimler
                .Include(e => e.Kategori)
                .Include(e => e.Moduller)
                .ThenInclude(m => m.Icerikler)
                .Include(e => e.EgitimKayitlari)
                .ThenInclude(ek => ek.Antrenor)
                .ThenInclude(a => a.User)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Egitim> CreateEgitimAsync(Egitim egitim)
        {
            egitim.CreatedAt = DateTime.UtcNow;
            egitim.IsActive = true;
            egitim.KayitliKisi = 0;

            _context.Egitimler.Add(egitim);
            await _context.SaveChangesAsync();

            return egitim;
        }

        public async Task<Egitim> UpdateEgitimAsync(Egitim egitim)
        {
            var existingEgitim = await _context.Egitimler.FindAsync(egitim.Id);
            if (existingEgitim == null)
            {
                throw new InvalidOperationException("Eğitim bulunamadı.");
            }

            existingEgitim.Name = egitim.Name;
            existingEgitim.Description = egitim.Description;
            existingEgitim.KategoriId = egitim.KategoriId;
            existingEgitim.Egitmen = egitim.Egitmen;
            existingEgitim.BaslangicTarihi = egitim.BaslangicTarihi;
            existingEgitim.BitisTarihi = egitim.BitisTarihi;
            existingEgitim.Sure = egitim.Sure;
            existingEgitim.Seviye = egitim.Seviye;
            existingEgitim.Kapasite = egitim.Kapasite;
            existingEgitim.Lokasyon = egitim.Lokasyon;
            existingEgitim.Durum = egitim.Durum;
            existingEgitim.Gereksinimler = egitim.Gereksinimler;
            existingEgitim.Materyaller = egitim.Materyaller;
            existingEgitim.Notlar = egitim.Notlar;
            existingEgitim.IsActive = egitim.IsActive;
            existingEgitim.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingEgitim;
        }

        public async Task<bool> DeleteEgitimAsync(int id)
        {
            var egitim = await _context.Egitimler.FindAsync(id);
            if (egitim == null)
            {
                return false;
            }

            egitim.IsActive = false;
            egitim.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<Egitim>> GetAktifEgitimlerAsync()
        {
            return await _context.Egitimler
                .Include(e => e.Kategori)
                .Where(e => e.IsActive)
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Egitim>> GetEgitimlerByKategoriAsync(int kategoriId)
        {
            return await _context.Egitimler
                .Include(e => e.Kategori)
                .Where(e => e.KategoriId == kategoriId && e.IsActive)
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<EgitimKategori>> GetAllKategorilerAsync()
        {
            return await _context.EgitimKategorileri
                .Where(k => k.IsActive)
                .OrderBy(k => k.DisplayOrder)
                .ThenBy(k => k.Name)
                .ToListAsync();
        }

        public async Task<EgitimKategori?> GetKategoriByIdAsync(int id)
        {
            return await _context.EgitimKategorileri
                .Include(k => k.Egitimler)
                .FirstOrDefaultAsync(k => k.Id == id);
        }

        public async Task<EgitimKategori> CreateKategoriAsync(EgitimKategori kategori)
        {
            kategori.CreatedAt = DateTime.UtcNow;
            kategori.IsActive = true;

            _context.EgitimKategorileri.Add(kategori);
            await _context.SaveChangesAsync();

            return kategori;
        }

        public async Task<EgitimKategori> UpdateKategoriAsync(EgitimKategori kategori)
        {
            var existingKategori = await _context.EgitimKategorileri.FindAsync(kategori.Id);
            if (existingKategori == null)
            {
                throw new InvalidOperationException("Kategori bulunamadı.");
            }

            existingKategori.Name = kategori.Name;
            existingKategori.Description = kategori.Description;
            existingKategori.Icon = kategori.Icon;
            existingKategori.Color = kategori.Color;
            existingKategori.DisplayOrder = kategori.DisplayOrder;
            existingKategori.IsActive = kategori.IsActive;

            await _context.SaveChangesAsync();

            return existingKategori;
        }

        public async Task<bool> DeleteKategoriAsync(int id)
        {
            var kategori = await _context.EgitimKategorileri.FindAsync(id);
            if (kategori == null)
            {
                return false;
            }

            kategori.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EgitimModul>> GetEgitimModulleriAsync(int egitimId)
        {
            return await _context.EgitimModulleri
                .Include(m => m.Icerikler)
                .Where(m => m.EgitimId == egitimId)
                .OrderBy(m => m.Sira)
                .ToListAsync();
        }

        public async Task<EgitimModul> CreateModulAsync(EgitimModul modul)
        {
            modul.CreatedAt = DateTime.UtcNow;

            _context.EgitimModulleri.Add(modul);
            await _context.SaveChangesAsync();

            return modul;
        }

        public async Task<EgitimModul> UpdateModulAsync(EgitimModul modul)
        {
            var existingModul = await _context.EgitimModulleri.FindAsync(modul.Id);
            if (existingModul == null)
            {
                throw new InvalidOperationException("Modül bulunamadı.");
            }

            existingModul.Name = modul.Name;
            existingModul.Description = modul.Description;
            existingModul.Sure = modul.Sure;
            existingModul.Sira = modul.Sira;
            existingModul.Durum = modul.Durum;
            existingModul.Hedefler = modul.Hedefler;
            existingModul.Materyaller = modul.Materyaller;
            existingModul.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingModul;
        }

        public async Task<bool> DeleteModulAsync(int id)
        {
            var modul = await _context.EgitimModulleri.FindAsync(id);
            if (modul == null)
            {
                return false;
            }

            _context.EgitimModulleri.Remove(modul);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EgitimIcerik>> GetModulIcerikleriAsync(int modulId)
        {
            return await _context.EgitimIcerikleri
                .Where(i => i.ModulId == modulId)
                .OrderBy(i => i.Sira)
                .ToListAsync();
        }

        public async Task<EgitimIcerik> CreateIcerikAsync(EgitimIcerik icerik)
        {
            icerik.CreatedAt = DateTime.UtcNow;

            _context.EgitimIcerikleri.Add(icerik);
            await _context.SaveChangesAsync();

            return icerik;
        }

        public async Task<EgitimIcerik> UpdateIcerikAsync(EgitimIcerik icerik)
        {
            var existingIcerik = await _context.EgitimIcerikleri.FindAsync(icerik.Id);
            if (existingIcerik == null)
            {
                throw new InvalidOperationException("İçerik bulunamadı.");
            }

            existingIcerik.Name = icerik.Name;
            existingIcerik.Description = icerik.Description;
            existingIcerik.Tip = icerik.Tip;
            existingIcerik.DosyaYolu = icerik.DosyaYolu;
            existingIcerik.Sure = icerik.Sure;
            existingIcerik.Sira = icerik.Sira;
            existingIcerik.Notlar = icerik.Notlar;

            await _context.SaveChangesAsync();

            return existingIcerik;
        }

        public async Task<bool> DeleteIcerikAsync(int id)
        {
            var icerik = await _context.EgitimIcerikleri.FindAsync(id);
            if (icerik == null)
            {
                return false;
            }

            _context.EgitimIcerikleri.Remove(icerik);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EgitimKayit>> GetEgitimKayitlariAsync(int egitimId)
        {
            return await _context.EgitimKayitlari
                .Include(ek => ek.Antrenor)
                .ThenInclude(a => a.User)
                .Include(ek => ek.Egitim)
                .Include(ek => ek.Tamamlamalar)
                .Include(ek => ek.Devamlar)
                .Include(ek => ek.Notlar)
                .Where(ek => ek.EgitimId == egitimId)
                .OrderByDescending(ek => ek.KayitTarihi)
                .ToListAsync();
        }

        public async Task<EgitimKayit> CreateEgitimKayitAsync(EgitimKayit kayit)
        {
            // Eğitim kapasitesini kontrol et
            var egitim = await _context.Egitimler.FindAsync(kayit.EgitimId);
            if (egitim != null && egitim.KayitliKisi >= egitim.Kapasite)
            {
                throw new InvalidOperationException("Eğitim kapasitesi dolu.");
            }

            // Daha önce kayıt olup olmadığını kontrol et
            var existingKayit = await _context.EgitimKayitlari
                .FirstOrDefaultAsync(ek => ek.AntrenorId == kayit.AntrenorId && ek.EgitimId == kayit.EgitimId);
            if (existingKayit != null)
            {
                throw new InvalidOperationException("Bu eğitime zaten kayıtlısınız.");
            }

            kayit.KayitTarihi = DateTime.UtcNow;
            kayit.Durum = "Kayıtlı";
            kayit.IsActive = true;
            kayit.CreatedAt = DateTime.UtcNow;

            _context.EgitimKayitlari.Add(kayit);

            // Eğitim kayıtlı kişi sayısını artır
            if (egitim != null)
            {
                egitim.KayitliKisi++;
            }

            await _context.SaveChangesAsync();

            return kayit;
        }

        public async Task<EgitimKayit> UpdateEgitimKayitAsync(EgitimKayit kayit)
        {
            var existingKayit = await _context.EgitimKayitlari.FindAsync(kayit.Id);
            if (existingKayit == null)
            {
                throw new InvalidOperationException("Eğitim kaydı bulunamadı.");
            }

            existingKayit.Durum = kayit.Durum;
            existingKayit.BaslangicTarihi = kayit.BaslangicTarihi;
            existingKayit.BitisTarihi = kayit.BitisTarihi;
            existingKayit.TamamlanmaOrani = kayit.TamamlanmaOrani;
            existingKayit.BasariPuani = kayit.BasariPuani;
            existingKayit.BasariDurumu = kayit.BasariDurumu;
            existingKayit.Notlar = kayit.Notlar;
            existingKayit.IsActive = kayit.IsActive;
            existingKayit.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return existingKayit;
        }

        public async Task<bool> DeleteEgitimKayitAsync(int id)
        {
            var kayit = await _context.EgitimKayitlari.FindAsync(id);
            if (kayit == null)
            {
                return false;
            }

            _context.EgitimKayitlari.Remove(kayit);

            // Eğitim kayıtlı kişi sayısını azalt
            var egitim = await _context.Egitimler.FindAsync(kayit.EgitimId);
            if (egitim != null)
            {
                egitim.KayitliKisi--;
            }

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<EgitimKayit>> GetAntrenorEgitimKayitlariAsync(int antrenorId)
        {
            return await _context.EgitimKayitlari
                .Include(ek => ek.Egitim)
                .ThenInclude(e => e.Kategori)
                .Include(ek => ek.Tamamlamalar)
                .Include(ek => ek.Devamlar)
                .Include(ek => ek.Notlar)
                .Where(ek => ek.AntrenorId == antrenorId)
                .OrderByDescending(ek => ek.KayitTarihi)
                .ToListAsync();
        }

        public async Task<List<EgitimTamamlama>> GetEgitimTamamlamalarAsync(int kayitId)
        {
            return await _context.EgitimTamamlamalar
                .Include(et => et.Modul)
                .Where(et => et.KayitId == kayitId)
                .OrderBy(et => et.TamamlanmaTarihi)
                .ToListAsync();
        }

        public async Task<EgitimTamamlama> CreateTamamlamaAsync(EgitimTamamlama tamamlama)
        {
            tamamlama.TamamlanmaTarihi = DateTime.UtcNow;
            tamamlama.CreatedAt = DateTime.UtcNow;

            _context.EgitimTamamlamalar.Add(tamamlama);
            await _context.SaveChangesAsync();

            return tamamlama;
        }

        public async Task<List<EgitimDevam>> GetEgitimDevamlarAsync(int kayitId)
        {
            return await _context.EgitimDevamlar
                .Where(ed => ed.KayitId == kayitId)
                .OrderBy(ed => ed.Tarih)
                .ToListAsync();
        }

        public async Task<EgitimDevam> CreateDevamAsync(EgitimDevam devam)
        {
            devam.CreatedAt = DateTime.UtcNow;

            _context.EgitimDevamlar.Add(devam);
            await _context.SaveChangesAsync();

            return devam;
        }

        public async Task<List<EgitimNot>> GetEgitimNotlarAsync(int kayitId)
        {
            return await _context.EgitimNotlar
                .Where(en => en.KayitId == kayitId)
                .OrderByDescending(en => en.Tarih)
                .ToListAsync();
        }

        public async Task<EgitimNot> CreateNotAsync(EgitimNot not)
        {
            not.Tarih = DateTime.UtcNow;
            not.CreatedAt = DateTime.UtcNow;

            _context.EgitimNotlar.Add(not);
            await _context.SaveChangesAsync();

            return not;
        }

        public async Task<bool> DeleteNotAsync(int id)
        {
            var not = await _context.EgitimNotlar.FindAsync(id);
            if (not == null)
            {
                return false;
            }

            _context.EgitimNotlar.Remove(not);
            await _context.SaveChangesAsync();

            return true;
        }
    }
} 
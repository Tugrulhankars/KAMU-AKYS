using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AntrenorEgitimTakip.API.Services
{
    public interface ISertifikaService
    {
        Task<List<Sertifika>> GetAllSertifikalarAsync();
        Task<Sertifika?> GetSertifikaByIdAsync(int id);
        Task<Sertifika> CreateSertifikaAsync(Sertifika sertifika);
        Task<Sertifika> UpdateSertifikaAsync(Sertifika sertifika);
        Task<bool> DeleteSertifikaAsync(int id);
        Task<List<Sertifika>> GetAntrenorSertifikalarAsync(int antrenorId);
        Task<List<Sertifika>> GetValidSertifikalarAsync();
        Task<List<Sertifika>> GetExpiringSertifikalarAsync(int days = 30);
        Task<List<SertifikaKategori>> GetAllSertifikaKategorileriAsync();
        Task<SertifikaKategori?> GetSertifikaKategoriByIdAsync(int id);
        Task<SertifikaKategori> CreateSertifikaKategoriAsync(SertifikaKategori kategori);
        Task<SertifikaKategori> UpdateSertifikaKategoriAsync(SertifikaKategori kategori);
        Task<bool> DeleteSertifikaKategoriAsync(int id);
        Task<List<SertifikaGereksinim>> GetSertifikaGereksinimlerAsync(int sertifikaId);
        Task<SertifikaGereksinim> CreateGereksinimAsync(SertifikaGereksinim gereksinim);
        Task<bool> DeleteGereksinimAsync(int id);
        Task<List<SertifikaSinav>> GetSertifikaSinavlarAsync(int sertifikaId);
        Task<SertifikaSinav> CreateSinavAsync(SertifikaSinav sinav);
        Task<bool> DeleteSinavAsync(int id);
        Task<List<SertifikaBasvuru>> GetSertifikaBasvurularAsync(int sertifikaId);
        Task<SertifikaBasvuru> CreateBasvuruAsync(SertifikaBasvuru basvuru);
        Task<bool> DeleteBasvuruAsync(int id);
        Task<List<SertifikaGecmis>> GetSertifikaGecmislerAsync(int sertifikaId);
        Task<SertifikaGecmis> CreateGecmisAsync(SertifikaGecmis gecmis);
        Task<bool> DeleteGecmisAsync(int id);
        Task<List<SertifikaGereksinim>> GetAllSertifikaGereksinimleriAsync();
        Task<List<SertifikaSinav>> GetAllSertifikaSinavlariAsync();
        Task<List<SertifikaBasvuru>> GetAllSertifikaBasvurulariAsync();
        Task<List<SertifikaGecmis>> GetAllSertifikaGecmisleriAsync();
    }

    public class SertifikaService : ISertifikaService
    {
        private readonly ApplicationDbContext _context;

        public SertifikaService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Sertifika>> GetAllSertifikalarAsync()
        {
            return await _context.Sertifikalar
                .Include(s => s.Antrenor)
                .Include(s => s.Kategori)
                .OrderByDescending(s => s.IssueDate)
                .ToListAsync();
        }

        public async Task<Sertifika?> GetSertifikaByIdAsync(int id)
        {
            return await _context.Sertifikalar
                .Include(s => s.Antrenor)
                .Include(s => s.Kategori)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Sertifika> CreateSertifikaAsync(Sertifika sertifika)
        {
            _context.Sertifikalar.Add(sertifika);
            await _context.SaveChangesAsync();
            return sertifika;
        }

        public async Task<Sertifika> UpdateSertifikaAsync(Sertifika sertifika)
        {
            var existing = await _context.Sertifikalar.FindAsync(sertifika.Id);
            if (existing == null)
                throw new InvalidOperationException("Sertifika bulunamadı.");
            existing.Name = sertifika.Name;
            existing.CertificateNumber = sertifika.CertificateNumber;
            existing.Description = sertifika.Description;
            existing.IssuingOrganization = sertifika.IssuingOrganization;
            existing.IssueDate = sertifika.IssueDate;
            existing.ExpiryDate = sertifika.ExpiryDate;
            existing.Level = sertifika.Level;
            existing.Status = sertifika.Status;
            existing.FilePath = sertifika.FilePath;
            existing.Notes = sertifika.Notes;
            existing.UpdatedBy = sertifika.UpdatedBy;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteSertifikaAsync(int id)
        {
            var sertifika = await _context.Sertifikalar.FindAsync(id);
            if (sertifika == null)
                return false;
            _context.Sertifikalar.Remove(sertifika);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Sertifika>> GetAntrenorSertifikalarAsync(int antrenorId)
        {
            return await _context.Sertifikalar
                .Include(s => s.Kategori)
                .Where(s => s.AntrenorId == antrenorId)
                .OrderByDescending(s => s.IssueDate)
                .ToListAsync();
        }

        public async Task<List<Sertifika>> GetValidSertifikalarAsync()
        {
            return await _context.Sertifikalar
                .Include(s => s.Antrenor)
                .Include(s => s.Kategori)
                .Where(s => s.ExpiryDate.HasValue && s.ExpiryDate.Value > DateTime.UtcNow)
                .OrderBy(s => s.ExpiryDate)
                .ToListAsync();
        }

        public async Task<List<Sertifika>> GetExpiringSertifikalarAsync(int days = 30)
        {
            var endDate = DateTime.UtcNow.AddDays(days);
            return await _context.Sertifikalar
                .Include(s => s.Antrenor)
                .Include(s => s.Kategori)
                .Where(s => s.ExpiryDate.HasValue && s.ExpiryDate.Value > DateTime.UtcNow && s.ExpiryDate.Value <= endDate)
                .OrderBy(s => s.ExpiryDate)
                .ToListAsync();
        }

        public async Task<List<SertifikaKategori>> GetAllSertifikaKategorileriAsync()
        {
            return await _context.SertifikaKategorileri
                .Where(k => k.IsActive)
                .OrderBy(k => k.Name)
                .ToListAsync();
        }

        public async Task<SertifikaKategori?> GetSertifikaKategoriByIdAsync(int id)
        {
            return await _context.SertifikaKategorileri.FindAsync(id);
        }

        public async Task<SertifikaKategori> CreateSertifikaKategoriAsync(SertifikaKategori kategori)
        {
            kategori.CreatedAt = DateTime.UtcNow;
            kategori.IsActive = true;

            _context.SertifikaKategorileri.Add(kategori);
            await _context.SaveChangesAsync();

            return kategori;
        }

        public async Task<SertifikaKategori> UpdateSertifikaKategoriAsync(SertifikaKategori kategori)
        {
            var existingKategori = await _context.SertifikaKategorileri.FindAsync(kategori.Id);
            if (existingKategori == null)
            {
                throw new InvalidOperationException("Sertifika kategori bulunamadı.");
            }

            existingKategori.Name = kategori.Name;
            existingKategori.Description = kategori.Description;
            existingKategori.IsActive = kategori.IsActive;

            await _context.SaveChangesAsync();

            return existingKategori;
        }

        public async Task<bool> DeleteSertifikaKategoriAsync(int id)
        {
            var kategori = await _context.SertifikaKategorileri.FindAsync(id);
            if (kategori == null)
            {
                return false;
            }

            kategori.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<SertifikaGereksinim>> GetSertifikaGereksinimlerAsync(int sertifikaId)
        {
            return await _context.SertifikaGereksinimleri
                .Where(sg => sg.CertificateId == sertifikaId)
                .OrderByDescending(sg => sg.CompletionDate)
                .ToListAsync();
        }

        public async Task<SertifikaGereksinim> CreateGereksinimAsync(SertifikaGereksinim gereksinim)
        {
            gereksinim.CreatedAt = DateTime.UtcNow;

            _context.SertifikaGereksinimleri.Add(gereksinim);
            await _context.SaveChangesAsync();

            return gereksinim;
        }

        public async Task<bool> DeleteGereksinimAsync(int id)
        {
            var gereksinim = await _context.SertifikaGereksinimleri.FindAsync(id);
            if (gereksinim == null)
            {
                return false;
            }

            _context.SertifikaGereksinimleri.Remove(gereksinim);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<SertifikaSinav>> GetSertifikaSinavlarAsync(int sertifikaId)
        {
            return await _context.SertifikaSinavlari
                .Where(sg => sg.CertificateId == sertifikaId)
                .OrderByDescending(sg => sg.ExamDate)
                .ToListAsync();
        }

        public async Task<SertifikaSinav> CreateSinavAsync(SertifikaSinav sinav)
        {
            sinav.CreatedAt = DateTime.UtcNow;

            _context.SertifikaSinavlari.Add(sinav);
            await _context.SaveChangesAsync();

            return sinav;
        }

        public async Task<bool> DeleteSinavAsync(int id)
        {
            var sinav = await _context.SertifikaSinavlari.FindAsync(id);
            if (sinav == null)
            {
                return false;
            }

            _context.SertifikaSinavlari.Remove(sinav);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<SertifikaBasvuru>> GetSertifikaBasvurularAsync(int sertifikaId)
        {
            return await _context.SertifikaBasvurulari
                .Where(sg => sg.AntrenorId == sertifikaId)
                .OrderByDescending(sg => sg.ApplicationDate)
                .ToListAsync();
        }

        public async Task<SertifikaBasvuru> CreateBasvuruAsync(SertifikaBasvuru basvuru)
        {
            basvuru.CreatedAt = DateTime.UtcNow;

            _context.SertifikaBasvurulari.Add(basvuru);
            await _context.SaveChangesAsync();

            return basvuru;
        }

        public async Task<bool> DeleteBasvuruAsync(int id)
        {
            var basvuru = await _context.SertifikaBasvurulari.FindAsync(id);
            if (basvuru == null)
            {
                return false;
            }

            _context.SertifikaBasvurulari.Remove(basvuru);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<SertifikaGecmis>> GetSertifikaGecmislerAsync(int sertifikaId)
        {
            return await _context.SertifikaGecmisleri
                .Where(sg => sg.CertificateId == sertifikaId)
                .OrderByDescending(sg => sg.ActionDate)
                .ToListAsync();
        }

        public async Task<SertifikaGecmis> CreateGecmisAsync(SertifikaGecmis gecmis)
        {
            gecmis.CreatedAt = DateTime.UtcNow;

            _context.SertifikaGecmisleri.Add(gecmis);
            await _context.SaveChangesAsync();

            return gecmis;
        }

        public async Task<bool> DeleteGecmisAsync(int id)
        {
            var gecmis = await _context.SertifikaGecmisleri.FindAsync(id);
            if (gecmis == null)
            {
                return false;
            }

            _context.SertifikaGecmisleri.Remove(gecmis);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<SertifikaGereksinim>> GetAllSertifikaGereksinimleriAsync()
        {
            return await _context.SertifikaGereksinimleri.ToListAsync();
        }

        public async Task<List<SertifikaSinav>> GetAllSertifikaSinavlariAsync()
        {
            return await _context.SertifikaSinavlari.ToListAsync();
        }

        public async Task<List<SertifikaBasvuru>> GetAllSertifikaBasvurulariAsync()
        {
            return await _context.SertifikaBasvurulari.ToListAsync();
        }

        public async Task<List<SertifikaGecmis>> GetAllSertifikaGecmisleriAsync()
        {
            return await _context.SertifikaGecmisleri.ToListAsync();
        }
    }
} 
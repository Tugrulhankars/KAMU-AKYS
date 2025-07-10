using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AntrenorEgitimTakip.API.Services
{
    public interface IPerformansService
    {
        Task<List<Performans>> GetAllPerformanslarAsync();
        Task<Performans?> GetPerformansByIdAsync(int id);
        Task<Performans> CreatePerformansAsync(Performans performans);
        Task<Performans> UpdatePerformansAsync(Performans performans);
        Task<bool> DeletePerformansAsync(int id);
        Task<List<PerformansHedef>> GetHedeflerAsync(int sporcuId);
        Task<PerformansHedef> CreateHedefAsync(PerformansHedef hedef);
        Task<PerformansHedef> UpdateHedefAsync(PerformansHedef hedef);
        Task<bool> DeleteHedefAsync(int id);
        // Diğer yeni model işlemleri eklenebilir
    }

    public class PerformansService : IPerformansService
    {
        private readonly ApplicationDbContext _context;

        public PerformansService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Performans>> GetAllPerformanslarAsync()
        {
            return await _context.Performanslar
                .Include(p => p.Sporcu)
                .ThenInclude(a => a.User)
                .Include(p => p.Kategori)
                .OrderByDescending(p => p.EvaluationDate)
                .ToListAsync();
        }

        public async Task<Performans?> GetPerformansByIdAsync(int id)
        {
            return await _context.Performanslar
                .Include(p => p.Sporcu)
                .ThenInclude(a => a.User)
                .Include(p => p.Kategori)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Performans> CreatePerformansAsync(Performans performans)
        {
            _context.Performanslar.Add(performans);
            await _context.SaveChangesAsync();
            return performans;
        }

        public async Task<Performans> UpdatePerformansAsync(Performans performans)
        {
            var existing = await _context.Performanslar.FindAsync(performans.Id);
            if (existing == null)
                throw new InvalidOperationException("Performans bulunamadı.");
            existing.Score = performans.Score;
            existing.Level = performans.Level;
            existing.Strengths = performans.Strengths;
            existing.AreasForImprovement = performans.AreasForImprovement;
            existing.Recommendations = performans.Recommendations;
            existing.Notes = performans.Notes;
            existing.UpdatedBy = performans.UpdatedBy;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeletePerformansAsync(int id)
        {
            var performans = await _context.Performanslar.FindAsync(id);
            if (performans == null)
                return false;
            _context.Performanslar.Remove(performans);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<PerformansHedef>> GetHedeflerAsync(int sporcuId)
        {
            return await _context.PerformansHedefleri
                .Where(h => h.SporcuId == sporcuId)
                .OrderByDescending(h => h.TargetDate)
                .ToListAsync();
        }

        public async Task<PerformansHedef> CreateHedefAsync(PerformansHedef hedef)
        {
            _context.PerformansHedefleri.Add(hedef);
            await _context.SaveChangesAsync();
            return hedef;
        }

        public async Task<PerformansHedef> UpdateHedefAsync(PerformansHedef hedef)
        {
            var existing = await _context.PerformansHedefleri.FindAsync(hedef.Id);
            if (existing == null)
                throw new InvalidOperationException("Performans hedefi bulunamadı.");
            existing.Goal = hedef.Goal;
            existing.TargetValue = hedef.TargetValue;
            existing.CurrentValue = hedef.CurrentValue;
            existing.Status = hedef.Status;
            existing.Description = hedef.Description;
            existing.ActionPlan = hedef.ActionPlan;
            existing.Notes = hedef.Notes;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteHedefAsync(int id)
        {
            var hedef = await _context.PerformansHedefleri.FindAsync(id);
            if (hedef == null)
                return false;
            _context.PerformansHedefleri.Remove(hedef);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 
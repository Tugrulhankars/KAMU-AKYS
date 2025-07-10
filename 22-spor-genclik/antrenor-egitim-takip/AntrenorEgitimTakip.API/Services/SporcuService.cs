using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AntrenorEgitimTakip.API.Services
{
    public class SporcuService
    {
        private readonly ApplicationDbContext _context;
        public SporcuService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Sporcu>> GetAllAsync()
        {
            return await _context.Sporcular.Include(s => s.User).ToListAsync();
        }

        public async Task<Sporcu?> GetByIdAsync(int id)
        {
            return await _context.Sporcular.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Sporcu> CreateAsync(Sporcu sporcu)
        {
            _context.Sporcular.Add(sporcu);
            await _context.SaveChangesAsync();
            return sporcu;
        }

        public async Task<Sporcu?> UpdateAsync(int id, Sporcu sporcu)
        {
            var existing = await _context.Sporcular.FindAsync(id);
            if (existing == null) return null;
            existing.AthleteNumber = sporcu.AthleteNumber;
            existing.LicenseNumber = sporcu.LicenseNumber;
            existing.Sport = sporcu.Sport;
            existing.Category = sporcu.Category;
            existing.Level = sporcu.Level;
            existing.LicenseStartDate = sporcu.LicenseStartDate;
            existing.LicenseEndDate = sporcu.LicenseEndDate;
            existing.Club = sporcu.Club;
            existing.Team = sporcu.Team;
            existing.Description = sporcu.Description;
            existing.UpdatedBy = sporcu.UpdatedBy;
            existing.IsActive = sporcu.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var sporcu = await _context.Sporcular.FindAsync(id);
            if (sporcu == null) return false;
            _context.Sporcular.Remove(sporcu);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 
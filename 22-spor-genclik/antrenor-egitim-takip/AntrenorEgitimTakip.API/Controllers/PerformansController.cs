using Microsoft.AspNetCore.Mvc;
using AntrenorEgitimTakip.API.Services;
using AntrenorEgitimTakip.API.Models;

namespace AntrenorEgitimTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerformansController : ControllerBase
    {
        private readonly PerformansService _performansService;
        public PerformansController(PerformansService performansService)
        {
            _performansService = performansService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _performansService.GetAllPerformanslarAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var performans = await _performansService.GetPerformansByIdAsync(id);
            if (performans == null) return NotFound();
            return Ok(performans);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Performans performans)
        {
            var created = await _performansService.CreatePerformansAsync(performans);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Performans performans)
        {
            if (id != performans.Id) return BadRequest();
            var updated = await _performansService.UpdatePerformansAsync(performans);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _performansService.DeletePerformansAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
} 
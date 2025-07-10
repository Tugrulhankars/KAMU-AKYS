using Microsoft.AspNetCore.Mvc;
using AntrenorEgitimTakip.API.Services;
using AntrenorEgitimTakip.API.Models;

namespace AntrenorEgitimTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SporcuController : ControllerBase
    {
        private readonly SporcuService _sporcuService;
        public SporcuController(SporcuService sporcuService)
        {
            _sporcuService = sporcuService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _sporcuService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sporcu = await _sporcuService.GetByIdAsync(id);
            if (sporcu == null) return NotFound();
            return Ok(sporcu);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sporcu sporcu)
        {
            var created = await _sporcuService.CreateAsync(sporcu);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Sporcu sporcu)
        {
            if (id != sporcu.Id) return BadRequest();
            var updated = await _sporcuService.UpdateAsync(id, sporcu);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _sporcuService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
} 
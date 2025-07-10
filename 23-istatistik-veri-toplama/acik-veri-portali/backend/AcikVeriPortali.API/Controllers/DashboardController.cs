using AcikVeriPortali.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcikVeriPortali.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public DashboardController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService;
        }

        /// <summary>
        /// Dashboard ana verilerini getirir
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetDashboardData()
        {
            var data = await _statisticsService.GetDashboardDataAsync();
            return Ok(data);
        }

        /// <summary>
        /// Popüler veri setlerini getirir
        /// </summary>
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularDataSets([FromQuery] int count = 10)
        {
            var data = await _statisticsService.GetPopularDataSetsAsync(count);
            return Ok(data);
        }

        /// <summary>
        /// Kategori istatistiklerini getirir
        /// </summary>
        [HttpGet("categories")]
        public async Task<IActionResult> GetCategoryStatistics()
        {
            var data = await _statisticsService.GetCategoryStatisticsAsync();
            return Ok(data);
        }

        /// <summary>
        /// Kullanıcı etkileşim metriklerini getirir
        /// </summary>
        [HttpGet("engagement")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserEngagementMetrics()
        {
            var data = await _statisticsService.GetUserEngagementMetricsAsync();
            return Ok(data);
        }

        /// <summary>
        /// Portal istatistiklerini getirir
        /// </summary>
        [HttpGet("portal")]
        public async Task<IActionResult> GetPortalStatistics([FromQuery] DateTime? date = null)
        {
            var data = await _statisticsService.GetPortalStatisticsAsync(date);
            return Ok(data);
        }

        /// <summary>
        /// Belirli bir tarih aralığındaki portal istatistiklerini getirir
        /// </summary>
        [HttpGet("portal/range")]
        public async Task<IActionResult> GetPortalStatisticsRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await _statisticsService.GetPortalStatisticsRangeAsync(startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Veri seti istatistiklerini getirir
        /// </summary>
        [HttpGet("dataset/{dataSetId}")]
        public async Task<IActionResult> GetDataSetStatistics(int dataSetId, [FromQuery] DateTime? date = null)
        {
            var data = await _statisticsService.GetDataSetStatisticsAsync(dataSetId, date);
            return Ok(data);
        }

        /// <summary>
        /// Veri seti istatistiklerini tarih aralığında getirir
        /// </summary>
        [HttpGet("dataset/{dataSetId}/range")]
        public async Task<IActionResult> GetDataSetStatisticsRange(int dataSetId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var data = await _statisticsService.GetDataSetStatisticsRangeAsync(dataSetId, startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Kullanıcı aktivitelerini getirir
        /// </summary>
        [HttpGet("user/{userId}/activities")]
        public async Task<IActionResult> GetUserActivities(int userId, [FromQuery] DateTime? startDate = null, [FromQuery] DateTime? endDate = null)
        {
            var data = await _statisticsService.GetUserActivitiesAsync(userId, startDate, endDate);
            return Ok(data);
        }

        /// <summary>
        /// Günlük istatistikleri manuel olarak oluşturur
        /// </summary>
        [HttpPost("generate-daily")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GenerateDailyStatistics()
        {
            var result = await _statisticsService.GenerateDailyStatisticsAsync();
            return Ok(new { Success = result, Message = "Günlük istatistikler oluşturuldu." });
        }

        /// <summary>
        /// Veri seti istatistiklerini manuel olarak oluşturur
        /// </summary>
        [HttpPost("dataset/{dataSetId}/generate")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GenerateDataSetStatistics(int dataSetId)
        {
            var result = await _statisticsService.GenerateDataSetStatisticsAsync(dataSetId);
            return Ok(new { Success = result, Message = "Veri seti istatistikleri oluşturuldu." });
        }
    }
} 
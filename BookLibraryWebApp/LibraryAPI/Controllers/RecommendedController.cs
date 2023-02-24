using Application.Library.Books.Queries;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    public class RecommendedController : BaseController
    {
        ILogger<RecommendedController> _logger;
        public RecommendedController(ILogger<RecommendedController> logger)
        {
            _logger = logger;
        }
        [HttpGet("{genre=genre}")]
        public async Task<ActionResult<BookList>> GetRecommendedBooks(string genre)
        {
            _logger.LogInformation("GetRecommendedBooks by genre: " + genre);
            return Ok(await Mediator.Send(GetRecomendetBooksByGenreQuery.Create(10, 10, genre)));
        }
    }
}

using Application.Library.Books.Queries;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{
    public class RecommendedController : BaseController
    {
        [HttpGet("{genre=genre}")]
        public async Task<ActionResult<BookList>> GetRecommendedBooks(string genre)
        {
            return Ok(await Mediator.Send(GetRecomendetBooksByGenreQuery.Create(10, 10, genre)));
        }
    }
}

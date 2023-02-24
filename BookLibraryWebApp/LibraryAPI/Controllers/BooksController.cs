using Application.Library.Books.Commands;
using Application.Library.Books.Queries;
using AutoMapper;
using LibraryAPI.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace LibraryAPI.Controllers
{

    [Produces("application/json")]
    public class BooksController : BaseController
    {
        IMapper _mapper;
        public BooksController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpGet("{order=order}")]
        public async Task<ActionResult<BookList>> GetBooks(string order)
        {
            return Ok(await Mediator.Send(new GetBooksWithOrderQuery { Order = order }));
        }
        [HttpGet("{id:int=id}")]
        public async Task<ActionResult<BookDetailsVm>> GetBooks(int id)
        {
            return Ok(await Mediator.Send(new GetBookDetailsQuery { Id = id }));
        }
        [HttpDelete("{id=id}/{secret=secret}")]
        public async Task<ActionResult> DeleteBook(int id, string secret)
        {
            await Mediator.Send(DeleteBookCommand.Create(id, secret));
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateBook([FromBody] CreateUpdateBookCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpPost("{id:int}/review")]
        public async Task<ActionResult<int>> CreateReview(int id, [FromBody] AddReviewDto dto)
        {
            var command = _mapper.Map<AddReviewCommand>(dto);
            command.BookId = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpPost("{id:int}/rate")]
        public async Task<ActionResult<int>> CreateReview(int id, [FromBody] AddRateDto dto)
        {
            var command = _mapper.Map<AddRateCommand>(dto);
            command.BookId = id;
            return Ok(await Mediator.Send(command));
        }
    }
}

using Application.Library.Books.Commands;
using Application.Library.Books.Queries;
using AutoMapper;
using LibraryAPI.Dtos;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace LibraryAPI.Controllers
{

    [Produces("application/json")]
    public class BooksController : BaseController
    {
        IMapper _mapper;
        ILogger<BooksController> _logger;
        public BooksController(IMapper mapper, ILogger<BooksController> logger)
        {
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("{order=order}")]
        public async Task<ActionResult<BookList>> GetBooks(string order)
        {
            _logger.LogInformation($"GetBooks by {order}");
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
            _logger.LogInformation($"DeleteBook by {id} this is secret {secret}");
            await Mediator.Send(DeleteBookCommand.Create(id, secret));
            return NoContent();
        }
        [HttpPost]
        [RequestSizeLimit(100_000_000)]
        public async Task<ActionResult<int>> CreateBook([FromBody] CreateUpdateBookCommand command)
        {
            _logger.LogInformation($"CreateBook: {JsonSerializer.Serialize(command)}");
            return Ok(await Mediator.Send(command));
        }
        [HttpPost("{id:int}/review")]
        public async Task<ActionResult<int>> CreateReview(int id, [FromBody] AddReviewDto dto)
        {
            _logger.LogInformation($"CreateReview: {JsonSerializer.Serialize(dto)} to Book with id: {id}");
            var command = _mapper.Map<AddReviewCommand>(dto);
            command.BookId = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpPost("{id:int}/rate")]
        public async Task<ActionResult<int>> CreateRate(int id, [FromBody] AddRateDto dto)
        {
            _logger.LogInformation($"CreateRate: {JsonSerializer.Serialize(dto)} to Book with id: {id}");
            var command = _mapper.Map<AddRateCommand>(dto);
            command.BookId = id;
            return Ok(await Mediator.Send(command));
        }
    }
}

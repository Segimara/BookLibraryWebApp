using Application.Common.Exceptions;
using Application.Interfaces;
using Domain;
using MediatR;

namespace Application.Library.Books.Commands
{
    public class CreateUpdateBookCommandHandler : IRequestHandler<CreateUpdateBookCommand, int>
    {
        public ILibraryDBContext _dbContext;
        public CreateUpdateBookCommandHandler(ILibraryDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<int> Handle(CreateUpdateBookCommand request, CancellationToken cancellationToken)
        {
            Book book = null;
            if (request.Id.HasValue)
            {
                book = _dbContext.Books.Find(request.Id);
                if (book == null)
                {
                    throw new NotFoundException(nameof(Book), request.Id);
                }
                book.Title = request.Title;
                book.Cover = request.Cover;
                book.Content = request.Content;
                book.Author = request.Author;
                book.Genre = request.Genre;
                _dbContext.Books.Update(book);
            }
            else
            {
                book = new Book
                {
                    Title = request.Title,
                    Cover = request.Cover,
                    Content = request.Content,
                    Author = request.Author,
                    Genre = request.Genre
                };
                _dbContext.Books.Add(book);
            }
            await _dbContext.SaveChangesAsync(cancellationToken);
            return book.Id;
        }
    }
}

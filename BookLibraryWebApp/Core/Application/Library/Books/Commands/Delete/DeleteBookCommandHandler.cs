using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Library.Books.Commands
{
    public class DeleteBookCommandHandler : IRequestHandler<DeleteBookCommand, int>
    {

        public ILibraryDBContext _dbContext;
        public IConfiguration _configuration;
        public DeleteBookCommandHandler(ILibraryDBContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }
        public async Task<int> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
        {
            if (request.Secret != _configuration["Secret"])
            {
                throw new ForbiddenException();
            }
            var deletedBook = await _dbContext.Books.FindAsync(request.Id);
            _dbContext.Books.Remove(deletedBook);
            _dbContext.SaveChangesAsync(cancellationToken);
            return request.Id;
        }
    }
}

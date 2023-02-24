using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Library.Books.Commands
{
    public class AddRateCommandHandler : IRequestHandler<AddRateCommand, int>
    {
        private readonly ILibraryDBContext _dBContext;

        public AddRateCommandHandler(ILibraryDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<int> Handle(AddRateCommand request, CancellationToken cancellationToken)
        {
            var book = await _dBContext.Books.FirstOrDefaultAsync(x => x.Id == request.BookId, cancellationToken);
            var rate = new Rating
            {
                Book = book,
                Score = request.Score
            };
            await _dBContext.Ratings.AddAsync(rate, cancellationToken);
            await _dBContext.SaveChangesAsync(cancellationToken);
            return rate.Id;
        }
    }
}

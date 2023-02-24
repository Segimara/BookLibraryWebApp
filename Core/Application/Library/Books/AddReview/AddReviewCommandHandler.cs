using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Library.Books.Commands
{
    public class AddReviewCommandHandler : IRequestHandler<AddReviewCommand, int>
    {
        private readonly ILibraryDBContext _dBContext;

        public AddReviewCommandHandler(ILibraryDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<int> Handle(AddReviewCommand request, CancellationToken cancellationToken)
        {
            var book = await _dBContext.Books.FirstOrDefaultAsync(x => x.Id == request.BookId, cancellationToken);
            var review = new Review
            {
                Message = request.Message,
                Reviewer = request.Reviewer,
                Book = book
            };
            await _dBContext.Reviews.AddAsync(review, cancellationToken);
            await _dBContext.SaveChangesAsync(cancellationToken);
            return review.Id;
        }
    }
}

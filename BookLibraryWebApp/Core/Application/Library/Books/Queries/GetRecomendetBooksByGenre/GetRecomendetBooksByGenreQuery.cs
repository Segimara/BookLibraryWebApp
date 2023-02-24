using MediatR;

namespace Application.Library.Books.Queries
{
    public class GetRecomendetBooksByGenreQuery : IRequest<BookList>
    {
        public int CountOfReviews { get; set; }
        public int TakeCount { get; set; }
        public string Genre { get; set; }
        public static GetRecomendetBooksByGenreQuery Create(int countOfReviews, int takeCount, string genre)
        {
            return new GetRecomendetBooksByGenreQuery
            {
                CountOfReviews = countOfReviews,
                TakeCount = takeCount,
                Genre = genre
            };
        }
    }
}

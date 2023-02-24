using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Library.Books.Queries
{
    public class GetRecomendetBooksByGenreQueryHandler : IRequestHandler<GetRecomendetBooksByGenreQuery, BookList>
    {
        public ILibraryDBContext _dbContext;
        public IMapper _mapper;
        public GetRecomendetBooksByGenreQueryHandler(ILibraryDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<BookList> Handle(GetRecomendetBooksByGenreQuery request, CancellationToken cancellationToken)
        { 
            var books = _dbContext.Books
                .Include(x => x.Reviews)
                .Include(x => x.Ratings)
                .Where(x => (x.Genre.ToLower() == request.Genre.ToLower()) && (x.Reviews.Count >= request.CountOfReviews))
                .ProjectTo<BookLookupDto>(_mapper.ConfigurationProvider)
                .AsParallel()
                .Where(x => x.ReviewsNumber >= request.CountOfReviews)
                .OrderByDescending(x => x.Rating)
                .Take(request.TakeCount)
                .ToList();
            var vm = new BookList
            {
                Books = books,
            };
            return vm;
        }


    }
}

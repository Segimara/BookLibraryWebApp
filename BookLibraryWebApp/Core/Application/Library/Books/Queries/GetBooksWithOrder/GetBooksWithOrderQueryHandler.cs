using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Library.Books.Queries
{
    public class GetBooksWithOrderQueryHandler : IRequestHandler<GetBooksWithOrderQuery, BookList>
    {
        public ILibraryDBContext _dbContext;
        public IMapper _mapper;
        public GetBooksWithOrderQueryHandler(ILibraryDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<BookList> Handle(GetBooksWithOrderQuery request, CancellationToken cancellationToken)
        {
            var mappedBooks = await SelectSortType(_dbContext.Books, request.Order)
                .Include(x => x.Reviews)
                .Include(x => x.Ratings)
                .ProjectTo<BookLookupDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var vm = new BookList
            {
                Books = mappedBooks,
            };
            return vm;
        }
        //todo reafctor to Strategy pattern
        private IOrderedQueryable<Book> SelectSortType(IQueryable<Book> set, string order)
        {
            //todo may be change to reflection select
            switch (order)
            {
                case "title":
                    return set.OrderBy(x => x.Title).ThenBy(x => x.Author);
                case "author":
                    return set.OrderBy(x => x.Author).ThenBy(x => x.Title);
                default:
                    return set.OrderBy(x => x.Id).ThenBy(x => x.Title).ThenBy(x => x.Author);
            }
        }
    }
}

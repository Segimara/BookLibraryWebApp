using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Library.Books.Queries
{
    public class GetBookDetailsQueryHandler : IRequestHandler<GetBookDetailsQuery, BookDetailsVm>
    {
        public ILibraryDBContext _dbContext;
        public IMapper _mapper;
        public GetBookDetailsQueryHandler(ILibraryDBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<BookDetailsVm> Handle(GetBookDetailsQuery request, CancellationToken cancellationToken)
        {
            var book = await _dbContext.Books
                .Include(x => x.Ratings)
                .Include(x => x.Reviews)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            return _mapper.Map<BookDetailsVm>(book);
        }
    }
}

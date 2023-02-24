using MediatR;

namespace Application.Library.Books.Queries
{
    public class GetBookDetailsQuery : IRequest<BookDetailsVm>
    {
        public int Id { get; set; }
    }
}

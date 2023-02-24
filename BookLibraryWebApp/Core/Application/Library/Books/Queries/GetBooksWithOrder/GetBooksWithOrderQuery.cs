using MediatR;

namespace Application.Library.Books.Queries
{
    public class GetBooksWithOrderQuery : IRequest<BookList>
    {
        public string Order { get; set; }
    }
}

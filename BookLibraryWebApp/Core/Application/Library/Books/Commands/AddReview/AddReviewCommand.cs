using MediatR;

namespace Application.Library.Books.Commands
{
    public class AddReviewCommand : IRequest<int>
    {
        public int BookId { get; set; }
        public string Reviewer { get; set; }
        public string Message { get; set; }
    }
}

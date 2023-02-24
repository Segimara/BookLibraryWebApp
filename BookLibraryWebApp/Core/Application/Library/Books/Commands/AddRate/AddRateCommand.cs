using MediatR;

namespace Application.Library.Books.Commands
{
    public class AddRateCommand : IRequest<int>
    {
        public int BookId { get; set; }
        public int Score { get; set; }
    }
}

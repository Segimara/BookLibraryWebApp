using MediatR;

namespace Application.Library.Books.Commands
{
    public class DeleteBookCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Secret { get; set; }
        public static DeleteBookCommand Create(int id, string secret)
        {
            return new DeleteBookCommand
            {
                Id = id,
                Secret = secret
            };
        }
    }
}

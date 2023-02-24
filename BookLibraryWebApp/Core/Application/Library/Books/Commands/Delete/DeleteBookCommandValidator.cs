using FluentValidation;

namespace Application.Library.Books.Commands
{
    public class DeleteBookCommandValidator : AbstractValidator<DeleteBookCommand>
    {
        public DeleteBookCommandValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Secret).NotNull();
        }
    }
}

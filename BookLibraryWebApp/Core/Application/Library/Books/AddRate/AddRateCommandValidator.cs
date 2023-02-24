using FluentValidation;

namespace Application.Library.Books.Commands
{
    public class AddRateCommandValidator : AbstractValidator<AddRateCommand>
    {
        public AddRateCommandValidator()
        {
            RuleFor(x => x.BookId).NotNull();
            RuleFor(x => x.Score).LessThanOrEqualTo(5).GreaterThanOrEqualTo(1);
        }
    }
}

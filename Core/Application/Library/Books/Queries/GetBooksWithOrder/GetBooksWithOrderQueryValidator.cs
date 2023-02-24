using FluentValidation;

namespace Application.Library.Books.Queries
{
    public class GetBooksWithOrderQueryValidator : AbstractValidator<GetBooksWithOrderQuery>
    {
        public GetBooksWithOrderQueryValidator()
        {
            RuleFor(v => v.Order)
            .NotEmpty().WithMessage("Sort order is required.")
            .NotNull()
            .Must(BeValidSortOrder).WithMessage("Sort order is not valid.");
        }

        private bool BeValidSortOrder(string arg)
        {
            switch (arg)
            {
                case "title":
                case "author":
                    return true;
                default:
                    return false;
            }
        }
    }
}

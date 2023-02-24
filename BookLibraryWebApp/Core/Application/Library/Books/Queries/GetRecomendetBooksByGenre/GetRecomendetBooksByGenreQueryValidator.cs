using FluentValidation;

namespace Application.Library.Books.Queries
{
    public class GetRecomendetBooksByGenreQueryValidator : AbstractValidator<GetRecomendetBooksByGenreQuery>
    {
        public GetRecomendetBooksByGenreQueryValidator()
        {
            RuleFor(x => x.CountOfReviews).NotEmpty().WithMessage("Count of reviews is required");
            RuleFor(x => x.TakeCount).NotEmpty().WithMessage("Take count is required");
        }
    }
}

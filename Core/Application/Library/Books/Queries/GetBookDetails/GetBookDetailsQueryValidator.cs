using FluentValidation;

namespace Application.Library.Books.Queries
{
    public class GetBookDetailsQueryValidator : AbstractValidator<GetBookDetailsQuery>
    {
        public GetBookDetailsQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}

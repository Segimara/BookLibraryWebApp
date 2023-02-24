using Application.Common.Mappings;
using Application.Library.Books.Commands;
using AutoMapper;

namespace LibraryAPI.Dtos
{
    public class AddReviewDto : IMapWith<AddReviewCommand>
    {
        public string Message { get; set; }
        public string Reviewer { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<AddReviewDto, AddReviewCommand>();
        }
    }
}

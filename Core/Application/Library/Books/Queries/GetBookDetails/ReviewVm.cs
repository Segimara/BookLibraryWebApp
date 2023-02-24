using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Library.Books.Queries
{
    public class ReviewVm : IMapWith<Review>
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Reviewer { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Review, ReviewVm>();
        }
    }
}

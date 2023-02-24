using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Library.Books.Queries
{
    public class BookLookupDto : IMapWith<Book>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Rating { get; set; }
        public int ReviewsNumber { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Book, BookLookupDto>()
                .ForMember(d => d.Rating, opt =>
                opt.MapFrom(s => s.AverageRating))
                .ForMember(d => d.ReviewsNumber, opt =>
                opt.MapFrom(s => s.ReviewsNumber));
        }
    }
}

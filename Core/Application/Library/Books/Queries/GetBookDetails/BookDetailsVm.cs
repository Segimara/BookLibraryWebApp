using Application.Common.Mappings;
using AutoMapper;
using Domain;

namespace Application.Library.Books.Queries
{
    public class BookDetailsVm : IMapWith<Book>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public string Content { get; set; }
        public string Genre { get; set; }
        public string Author { get; set; }
        public decimal Rating { get; set; }
        public ICollection<ReviewVm> Reviews { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Book, BookDetailsVm>()
                .ForMember(d => d.Rating, opt => opt.MapFrom(s => s.AverageRating))
                .ForMember(d => d.Reviews, opt => opt.MapFrom(s => s.Reviews));
        }
    }
}

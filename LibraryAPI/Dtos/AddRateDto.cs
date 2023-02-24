using Application.Common.Mappings;
using Application.Library.Books.Commands;
using AutoMapper;

namespace LibraryAPI.Dtos
{
    public class AddRateDto : IMapWith<AddRateCommand>
    {
        public int Score { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<AddRateDto, AddRateCommand>();
        }
    }
}

using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {

            services.AddDbContext<LibraryDBContext>(opt =>
            {
                opt.UseInMemoryDatabase(databaseName: "LibraryDB");
                //opt.UseNpgsql("User ID=postgres;Password=32-89907;Host=localhost;Port=5432;Database=Library;");
            });
            services.AddScoped<ILibraryDBContext>(provider =>
                provider.GetService<LibraryDBContext>());
            return services;
        }
    }
}

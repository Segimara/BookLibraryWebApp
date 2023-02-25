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
            });
            services.AddScoped<ILibraryDBContext>(provider =>
                provider.GetService<LibraryDBContext>());
            return services;
        }
    }
}

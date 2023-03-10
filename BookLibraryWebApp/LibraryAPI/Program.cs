using Application;
using Application.Common.Mappings;
using Application.Interfaces;
using LibraryAPI.Middleware;
using Persistence;
using System.Reflection;

namespace LibraryAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: "LibrarySpecificOrigins",
                                  policy =>
                                  {
                                      policy.WithOrigins("https://localhost:5000",
                                                         "https://localhost:4200");
                                  });
            });
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddLogging(logging => logging.AddConsole());
            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile(new AssemblyMappingProfile(Assembly.GetExecutingAssembly()));
                cfg.AddProfile(new AssemblyMappingProfile(typeof(ILibraryDBContext).Assembly));
            });

            builder.Services.AddApplication();
            builder.Services.AddPersistence();
            var app = builder.Build();
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<LibraryDBContext>();
                    DBInit.Initialize(context);
                }
                catch (Exception e)
                {
                    throw;
                }
            }
            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(config =>
                {
                });
            }
            app.UseCustomExceptionHandler();
            app.UseHttpsRedirection();
            app.UseCors("LibrarySpecificOrigins");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
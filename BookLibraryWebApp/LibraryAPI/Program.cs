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

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

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

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(config =>
                {
                    //config.RoutePrefix = String.Empty;
                    //config.SwaggerEndpoint("swagger/swagger.json", "LibraryApi");
                    //config.OAuthClientId("todolist-swagger");
                    //config.OAuthAppName("ToDoList Swagger");
                    //config.OAuthUsePkce();
                });
            }
            app.UseCustomExceptionHandler();
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
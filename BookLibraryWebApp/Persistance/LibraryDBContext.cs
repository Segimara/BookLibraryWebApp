using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.EnityTypeConfig;

namespace Persistence
{
    public class LibraryDBContext : DbContext, ILibraryDBContext
    {

        public DbSet<Book> Books { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public LibraryDBContext(DbContextOptions<LibraryDBContext> options)
        : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BookConfiguration());
            modelBuilder.ApplyConfiguration(new RatingConfiguration());
            modelBuilder.ApplyConfiguration(new ReviewConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}

using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Application.Interfaces
{
    public interface ILibraryDBContext
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Review> Reviews { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        public EntityEntry Update(object entity);
    }
}

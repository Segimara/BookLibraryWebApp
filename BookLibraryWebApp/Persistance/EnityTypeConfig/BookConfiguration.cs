using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.EnityTypeConfig
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.Id).IsUnique();
            builder.HasMany(x => x.Ratings).WithOne(x => x.Book).HasForeignKey(x => x.BookId);
            builder.HasMany(x => x.Reviews).WithOne(x => x.Book).HasForeignKey(x => x.BookId);
        }
    }
}

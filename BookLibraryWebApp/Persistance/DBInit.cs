using Bogus;
using Domain;

namespace Persistence
{
    public class DBInit
    {
        public static void Initialize(LibraryDBContext context)
        {
            context.Database.EnsureCreated();
            //data seeding 
            int BooksCount = 5;
            int RatingsCount = 20;
            int ReviewsCount = 20;
            var ids = 1;
            string[] Genres = new string[]
            {
                "horror",
                "adventure",
                "comedy"
            };
            var booksStock = new Faker<Book>()
               .RuleFor(m => m.Id, f => ids++)
               .RuleFor(m => m.Title, f => f.Lorem.Sentence(3))
               .RuleFor(m => m.Author, f => f.Person.FullName)
               .RuleFor(m => m.Genre, f => Genres[f.Random.Int(0, Genres.Length - 1)])
               .RuleFor(m => m.Content, f => f.Lorem.Text())
               .RuleFor(m => m.Cover, f => f.Image.Image());
            ids = 1;
            var ratingsStock = new Faker<Rating>()
                .RuleFor(m => m.Id, f => ids++)
                .RuleFor(m => m.Score, f => f.Random.Int(1, 5))
                .RuleFor(m => m.BookId, f => f.Random.Int(1, BooksCount));
            ids = 1;
            var reviewsStock = new Faker<Review>()
                .RuleFor(m => m.Id, f => ids++)
                .RuleFor(m => m.Reviewer, f => f.Person.FullName)
                .RuleFor(m => m.Message, f => f.Lorem.Text())
                .RuleFor(m => m.BookId, f => f.Random.Int(1, BooksCount));
            var listBooks = booksStock.Generate(BooksCount);
            var listRatings = ratingsStock.Generate(RatingsCount);
            var listReviews = reviewsStock.Generate(ReviewsCount);
            if (!context.Books.Any())
            {
                context.Books.AddRange(listBooks);
            }
            if (!context.Ratings.Any())
            {
                context.Ratings.AddRange(listRatings);
            }
            if (!context.Reviews.Any())
            {
                context.Reviews.AddRange(listReviews);

            }
            context.SaveChanges();
        }
    }
}

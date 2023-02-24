namespace Domain
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Cover { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Review> Reviews { get; set; }

        public decimal AverageRating
        {
            get
            {
                if (!Ratings.Any())
                    return 0;
                return Ratings.Average(r => Convert.ToDecimal(r.Score));
            }
        }
        public int ReviewsNumber
        {
            get
            {
                return Reviews.Count;
            }
        }
        public Book()
        {
            Ratings = new List<Rating>();
            Reviews = new List<Review>();
        }
    }
}

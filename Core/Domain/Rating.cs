using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Score { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
    }
}

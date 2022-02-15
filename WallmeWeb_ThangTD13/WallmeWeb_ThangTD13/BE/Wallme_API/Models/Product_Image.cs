namespace Wallme_API.Models
{
    public class Product_Image
    {
        public int Id { get; set; }

        public string ImagePath { get; set; }

        public int Index { get; set; }

        public Product Product { get; set; }

        public int ProductId { get; set; }
    }
}
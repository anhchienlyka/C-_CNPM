namespace Wallme_API.Models
{
    public class Order_Item
    {
        public Order Order { get; set; }

        public int OrderId { get; set; }

        public Product Product { get; set; }

        public int ProductId { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public decimal Total_Price { get; set; }
    }
}
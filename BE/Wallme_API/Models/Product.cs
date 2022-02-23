using System.Collections.Generic;

namespace Wallme_API.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public decimal Sale { get; set; }

        public int Inventory { get; set; }

        public Category Category { get; set; }

        public int CategoryId { get; set; }
        public string Description { get; set; }

        public ICollection<Product_Image> ProductImages { get; set; }
        public ICollection<OrderDetail>  OrderDetails { get; set; }
        public ICollection<Comment>  Comments { get; set; }
    }
}
using System;
using System.Collections.Generic;
using Wallme_API.Constraint;

namespace Wallme_API.Models
{
    public class Order
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalPrice { get; set; }

        public string Address { get; set; }

        public OrderStatus Status { get; set; }

        public bool Payment { get; set; }

        public ICollection<Order_Item> OrderItems { get; set; }
    }
}
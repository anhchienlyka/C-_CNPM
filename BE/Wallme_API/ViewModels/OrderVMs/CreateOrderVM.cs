using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Constraint;
using Wallme_API.Models;
using Wallme_API.ViewModels.OrderDetailVMs;

namespace Wallme_API.ViewModels.OrderVMs
{
    public class CreateOrderVM
    {
        public int UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalPrice { get; set; }


        public OrderStatus Status { get; set; }

        public bool Payment { get; set; }

        public ICollection<CreateOrderDetailVM> OrderDetails { get; set; }
    }
}

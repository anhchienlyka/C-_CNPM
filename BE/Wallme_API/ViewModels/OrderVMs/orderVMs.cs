using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Constraint;

namespace Wallme_API.ViewModels.OrderVMs
{
    public class orderVMs
    {
        public int OderId { get; set; }
        public int UserId  { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalPrice { get; set; }

        public OrderStatus Status { get; set; }

        public bool Payment { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }






    }
}

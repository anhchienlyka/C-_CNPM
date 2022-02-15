﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Constraint;
using Wallme_API.Models;
using Wallme_API.ViewModels.OrderItemVMs;

namespace Wallme_API.ViewModels.OrderVMs
{
    public class CreateOrderVM
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalPrice { get; set; }

        public string Address { get; set; }

        public OrderStatus Status { get; set; }

        public bool Payment { get; set; }

        public ICollection<CreateOrderItemVM> OrderItems { get; set; }
    }
}
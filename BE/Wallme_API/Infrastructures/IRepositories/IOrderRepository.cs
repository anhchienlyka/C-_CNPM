﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.IRepositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        int GetLastOrderId();
        IEnumerable<Order> GetAllOrders();
    }
}

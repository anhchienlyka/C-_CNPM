﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(WallmeDbContext context) : base(context)
        {
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return context.Order.Include(x => x.User).ToList();
        }

        public int GetLastOrderId()
        {
            return context.Order.OrderByDescending(x => x.Id).FirstOrDefault().Id;
        }
    }
}
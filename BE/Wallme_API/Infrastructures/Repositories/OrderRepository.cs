using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;
using System.Linq;
namespace Wallme_API.Infrastructures.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(WallmeDbContext context):base(context)
        {

        }

        public int GetLastOrderId()
        {
            return context.Order.OrderByDescending(x => x.Id).FirstOrDefault().Id;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.Repositories
{
    public class OrderDetailRepository : GenericRepository<OrderDetail>, IOrderDetailRepository
    {
        public OrderDetailRepository(WallmeDbContext context) : base(context)
        {

        }
    }
}

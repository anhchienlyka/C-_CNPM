using System;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;

namespace Wallme_API.Infrastructures
{
    public interface IUnitOfWork : IDisposable
    {
        ICategoryRepository CategoryRepository { get; }

        IProductRepository ProductRepository { get; }

        IOrderRepository OrderRepository { get; }


        IOrderDetailRepository OrderDetailRepository { get; }
        WallmeDbContext WallmeDbContext { get; }

        int SaveChanges();
    }
}
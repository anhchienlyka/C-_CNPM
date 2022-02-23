using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Infrastructures.Repositories;

namespace Wallme_API.Infrastructures
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WallmeDbContext _context;
        private ICategoryRepository categoryRepository;
        private IProductRepository productRepository;
        private IOrderRepository orderRepository;
        private IProductImageRepository productImageRepository;
        private IOrderDetailRepository orderDetailRepository;
        public UnitOfWork(WallmeDbContext context)
        {
            _context = context;
        }
        public ICategoryRepository CategoryRepository => this.categoryRepository ??= new CategoryRepository(_context);
        public IProductRepository ProductRepository => this.productRepository ??= new ProductRepository(_context);
        public IOrderRepository OrderRepository => this.orderRepository ??= new OrderRepository(_context);

        public IProductImageRepository ProductImageRepository => this.productImageRepository ??= new ProductImageRepository(_context);


        public WallmeDbContext WallmeDbContext => _context;

        public IOrderDetailRepository OrderDetailRepository => this.orderDetailRepository??new OrderDetailRepository(_context);

        public void Dispose()
        {
            _context.Dispose();
        }

        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}

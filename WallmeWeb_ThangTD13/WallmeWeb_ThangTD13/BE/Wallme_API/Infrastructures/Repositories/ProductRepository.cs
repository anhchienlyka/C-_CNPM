using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;
using Wallme_API.ViewModels.ProductVMs;

namespace Wallme_API.Infrastructures.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository 
    {
        public ProductRepository(WallmeDbContext context) : base(context)
        {
        }

        public List<Product> FindProductsByName(string name)
        {
            return context.Products.Where(x => x.Name.Contains(name)).Include(x=>x.ProductImages).ToList();
        }

        public IQueryable<Product> GetAllProducts()
        {
            return context.Products.Include(x => x.ProductImages).AsQueryable();
        }

        public Product GetProductById(int id)
        {
            return context.Products.Where(x => x.Id == id).Include(x => x.ProductImages).FirstOrDefault();
        }

        public List<Product> GetProductsByCategoryId(int id)
        {
            return context.Products.Where(x => x.CategoryId == id).Include(x=>x.ProductImages).ToList();
        }


    }
}

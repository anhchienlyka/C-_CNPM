using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.ViewModels.ProductVMs;

namespace Wallme_API.Infrastructures.IRepositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        List<Product> GetProductsByCategoryId(int id);

        List<Product> FindProductsByName(string name);

        IQueryable<Product> GetAllProducts();

        Product GetProductById(int id);
    }
}

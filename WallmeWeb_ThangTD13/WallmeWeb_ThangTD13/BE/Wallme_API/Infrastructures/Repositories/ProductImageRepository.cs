using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.Repositories
{
    public class ProductImageRepository : GenericRepository<Product_Image>, IProductImageRepository
    {
        public ProductImageRepository(WallmeDbContext context):base(context)
        {

        }

        public List<Product_Image> GetImagesByProductId(int id)
        {
            return context.ProductImages.Where(x => x.ProductId == id).ToList();
        }
    }
}

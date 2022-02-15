using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.IRepositories
{
    public interface IProductImageRepository : IGenericRepository<Product_Image>
    {
        List<Product_Image> GetImagesByProductId(int id);
    }
}

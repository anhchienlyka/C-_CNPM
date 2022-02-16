using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Services.ProductImageService
{
    public interface IProductImageService
    {
        public void AssignImageToProduct(int productId, string imagePath, int index);
    }
}

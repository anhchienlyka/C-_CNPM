using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Infrastructures;
using Wallme_API.Models;

namespace Wallme_API.Services.ProductImageService
{
    public class ProductImageService : IProductImageService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductImageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public void AssignImageToProduct(int productId, string imagePath, int index = 0)
        {
            Product_Image product_Image = new Product_Image()
            {
                ImagePath = imagePath,
                ProductId = productId,
                Index = index,
            };
            _unitOfWork.ProductImageRepository.Add(product_Image);
            _unitOfWork.SaveChanges();
        }
    }
}

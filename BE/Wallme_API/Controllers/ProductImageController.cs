using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Infrastructures;
using Wallme_API.Models;
using Wallme_API.ViewModels.ProductImageVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductImageController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductImageController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProductImageVm> GetAll()
        {
            var productImages = _unitOfWork.ProductImageRepository.GetAll();
            List<ProductImageVm> result = new List<ProductImageVm>();
            foreach (var item in productImages)
            {
                result.Add(_mapper.Map<ProductImageVm>(item));
            }
            return result;
        }

        [HttpGet]
        [Route("{id}")]
        public IEnumerable<ProductImageVm> GetImagesByProductId(int id)
        {
            var productImages = _unitOfWork.ProductImageRepository.GetImagesByProductId(id);
            List<ProductImageVm> result = new List<ProductImageVm>();
            foreach (var item in productImages)
            {
                result.Add(_mapper.Map<ProductImageVm>(item));
            }
            return result;
        }
    }
}

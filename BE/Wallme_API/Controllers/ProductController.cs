﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Constraint;
using Wallme_API.Infrastructures;
using Wallme_API.Infrastructures.Repositories;
using Wallme_API.Models;

using Wallme_API.ViewModels.ProductVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly Paging<Product> productPaging = new Paging<Product>();
        public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<ProductVM> GetAll(int pageIndex, int pageSize)
        {
            var sourceIQueryable = _unitOfWork.ProductRepository.GetAllProducts().OrderByDescending(x=>x.Id);
            var products = productPaging.ToPagedList(sourceIQueryable, pageIndex, pageSize);
            Response.Headers.Add(PagingConstraint.pageIndex, productPaging.PageIndex.ToString());
            Response.Headers.Add(PagingConstraint.pageSize, productPaging.PageSize.ToString());
            Response.Headers.Add(PagingConstraint.totalPages, productPaging.TotalPages.ToString());
            List<ProductVM> result = new List<ProductVM>();
            foreach (var product in products)
            {
                result.Add(_mapper.Map<ProductVM>(product));
            }
            return result;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public IEnumerable<ProductVM> GetAllProducts()
        {
            var sourceIQueryable = _unitOfWork.ProductRepository.GetAll();
            List<ProductVM> result = new List<ProductVM>();
            foreach (var product in sourceIQueryable)
            {
                result.Add(_mapper.Map<ProductVM>(product));
            }
            return result.OrderByDescending(x=>x.Id);
        }
        [HttpGet]
        [Route("{id}")]
        public ProductVM Details(int id)
        {
            return _mapper.Map<ProductVM>(_unitOfWork.ProductRepository.GetProductById(id));
        }

        [HttpGet]
        //[Route("Category/{id}")]
        [Route("GetProductsByCategory")]
        public IEnumerable<ProductVM> GetProductsByCategoryId(int categoryId)
        {
            var products = _unitOfWork.ProductRepository.GetProductsByCategoryId(categoryId);
            List<ProductVM> result = new List<ProductVM>();
            foreach (var item in products)
            {
                result.Add(_mapper.Map<ProductVM>(item));
            }
            return result.OrderByDescending(x=>x.CategoryId);
        }

        [HttpGet]
        [Route("FindProductByName")]
        public IEnumerable<ProductVM>  FindProductsByName(string name)
        {
            var products = _unitOfWork.ProductRepository.FindProductsByName(name);
            List<ProductVM> result = new List<ProductVM>();
            foreach (var item in products)
            {
                result.Add(_mapper.Map<ProductVM>(item));
            }
            return result.OrderByDescending(x=>x.Id);
        }
       
        [HttpPost]
        public void Create(CreateProductVM createProductVM)
        {
            Product product = _mapper.Map<Product>(createProductVM);
            _unitOfWork.ProductRepository.Add(product);
            _unitOfWork.SaveChanges();
            var existProduct = _unitOfWork.ProductRepository.FindProductsByName(createProductVM.Name)[0];      
        }

        [HttpPut]
        public void Update(UpdateProductVM updateProductVM)
        {
            Product product = _mapper.Map<Product>(updateProductVM);
            _unitOfWork.ProductRepository.Update(product);
            _unitOfWork.SaveChanges();
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _unitOfWork.ProductRepository.Delete(id);
            _unitOfWork.SaveChanges();
        }

    }
}

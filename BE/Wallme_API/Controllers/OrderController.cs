﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Infrastructures;
using Wallme_API.Models;
using Wallme_API.ViewModels.OrderVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            return _unitOfWork.OrderRepository.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public Product Details(int id)
        {
            return _unitOfWork.ProductRepository.GetById(id);
        }

        [HttpPost]
        public void Create(CreateOrderVM createOrderVM)
        {
                Order order = _mapper.Map<Order>(createOrderVM);
            _unitOfWork.OrderRepository.Add(order);
            foreach(var item in createOrderVM.OrderDetails)
            {
                var current_product = _unitOfWork.ProductRepository.GetProductById(item.ProductId);
                current_product.Inventory -= item.Quantity;
                _unitOfWork.ProductRepository.Update(current_product);
            }
            _unitOfWork.SaveChanges();   
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _unitOfWork.OrderRepository.Delete(id);
            _unitOfWork.SaveChanges();
        }
    }
}

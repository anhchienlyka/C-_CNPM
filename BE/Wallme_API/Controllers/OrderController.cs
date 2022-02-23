using AutoMapper;
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
            _unitOfWork.SaveChanges();
            var orderId = _unitOfWork.OrderRepository.GetLastOrderId();
            foreach (var item in createOrderVM.OrderDetails)
            {
                item.OrderId = orderId;
                var orderDetail = new OrderDetail()
                {
                    OrderId = item.OrderId,
                    Price = item.Price,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                };
                _unitOfWork.OrderDetailRepository.Add(orderDetail);
                _unitOfWork.SaveChanges();
            }      
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _unitOfWork.OrderRepository.Delete(id);
            _unitOfWork.SaveChanges();
        }
    }
}

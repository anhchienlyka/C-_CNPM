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
        public IEnumerable<orderVMs> GetAll()
        {
            var orders= _unitOfWork.OrderRepository.GetAllOrders();
            var listOrderVms = new List<orderVMs>();
            foreach (var item in orders)
            {
                var hihi = new orderVMs()
                {
                    OderId = item.Id,
                    UserId = item.UserId,
                    FullName = item.User.FullName,
                    Address = item.User.Address,
                    OrderDate = item.OrderDate,
                    Payment = item.Payment,
                    Status = item.Status,
                    TotalPrice = item.TotalPrice
                };
                listOrderVms.Add(hihi);
            }
            return listOrderVms.OrderByDescending(x=>x.OderId);
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
            order.OrderDate = DateTime.Now;
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

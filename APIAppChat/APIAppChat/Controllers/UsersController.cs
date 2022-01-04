using APIAppChat.Entities;
using APIAppChat.UnitOfWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult <IEnumerable<AppUser>> GetUsers()
        {
            var users = _unitOfWork.UserRepository.GetAll();
            return users;
        }

        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUserById(int id)
        {
            return _unitOfWork.UserRepository.GetById(id);
            
        }

    }
}

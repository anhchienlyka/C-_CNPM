using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private UserManager<User> _userManager;
        private IMapper _mapper;

        public UserController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        public List<UserVM> GetAll()
        {
            var users = _userManager.Users.ToList();
            List<UserVM> result = new List<UserVM>();
            foreach (var item in users)
            {
                result.Add(_mapper.Map<UserVM>(item));
            }
            return result;
        }

        [HttpPost]
        public async Task<IdentityResult> Create(CreateUserVM createUserVM)
        {
            User user = _mapper.Map<User>(createUserVM);
            var result = await _userManager.CreateAsync(user, createUserVM.Password);
            var existUser = await _userManager.FindByEmailAsync(createUserVM.Email);
            await _userManager.AddToRoleAsync(existUser, createUserVM.RoleName);
            return result;
        }

        [HttpPut]
        public async Task<IdentityResult> Update(UpdateUserVM updateUserVM)
        {
            var user = await _userManager.FindByIdAsync(updateUserVM.Id.ToString());
            user.UserName = updateUserVM.UserName;
            return await _userManager.UpdateAsync(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IdentityResult> Delete(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            return await _userManager.DeleteAsync(user);
        }

    }
}

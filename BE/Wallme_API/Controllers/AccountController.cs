using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.Services.UserService;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;

        public AccountController(IUserService userService, UserManager<User> userManager)
        {
            _userService = userService;
            _userManager = userManager;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login(LoginVM request)
        {
            var result = await _userService.GenerateToken(request);
            if (result.Token != null)
            {
                return Ok(result.Token);
            }
            return BadRequest(result.Message);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(CreateUserVM createUserVM)
        {
            var result = await _userService.CreateAsync(createUserVM);
            //var existUser = await _userManager.FindByEmailAsync(createUserVM.Email);
            //await _userManager.AddToRoleAsync(existUser, "user");
            var demo = await _userService.RoleAssignAsync(createUserVM.UserName, "user");
            return Ok(result);
        }

    }
}

using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration,IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<IdentityCustomResult> CreateAsync(CreateUserVM request)
        {
            try
            {
                var user = _mapper.Map<User>(request);
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new SuccessResult();
                }
                return new ErrorResult(result.Errors);

            }catch(Exception ex)
            {
                throw ;
            }
        }

        public async Task<IdentityCustomResult> GenerateToken(LoginVM request)
        {
            var result = await this.SignInAsync(request);
            if (result.IsSuccessed)
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                var roles = await _userManager.GetRolesAsync(user);
                var claims = new List<Claim>()
                {
                 new Claim("email",user.Email),
                 new Claim("userId",user.Id.ToString()),
                 new Claim("username",user.UserName),
                 new Claim("phoneNumber",user.PhoneNumber),
                 new Claim("address",user.Address),
                 new Claim("fullname",user.FullName)
                 };
                foreach (var role in roles) 
                    claims.Add(new Claim("role", role));
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256); //rsA

                var token = new JwtSecurityToken(
                   issuer: _configuration["Jwt:Issuer"],
                   audience: _configuration["Jwt:Audience"],
                   claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: creds);

                return new SuccessResult(new JwtSecurityTokenHandler().WriteToken(token));
            }
            return new ErrorResult("Login failed");
        }

        public async Task<IdentityCustomResult> RoleAssignAsync(string username, string roleName)
        {
            try
            {
                //var user = await _userManager.FindByEmailAsync(email);
                var user = await _userManager.FindByNameAsync(username);
                if (user == null) return new ErrorResult("Khong tim thay username");
                var result = await _userManager.AddToRoleAsync(user, roleName);
                if (result.Succeeded) return new SuccessResult();
                return new ErrorResult("Role Assign failed");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IdentityCustomResult> SignInAsync(LoginVM request)
        {
            try
            {
                //hash
                //var user = await _userManager.FindByEmailAsync(request.Email);
                //if (user == null) return new ErrorResult("Khong tim thay tai khoan");
                //var result = await _signInManager.PasswordSignInAsync(user, request.Password, true, true);
                var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, true, true);
                if (result.Succeeded) return new SuccessResult();
                return new ErrorResult("Dang nhap khong thanh cong");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

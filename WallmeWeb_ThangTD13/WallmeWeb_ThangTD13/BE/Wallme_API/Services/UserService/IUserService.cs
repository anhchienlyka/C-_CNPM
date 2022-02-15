using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.Services.UserService
{
    public interface IUserService
    {
        Task<IdentityCustomResult> CreateAsync(CreateUserVM request);

        Task<IdentityCustomResult> SignInAsync(LoginVM request);

        Task<IdentityCustomResult> RoleAssignAsync(string email, string roleName);

        /// <summary>
        /// Generate token for login api
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<IdentityCustomResult> GenerateToken(LoginVM request);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.ViewModels.UserVMs
{
    public class CreateUserVM
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string RoleName { get; set; }
    }
}

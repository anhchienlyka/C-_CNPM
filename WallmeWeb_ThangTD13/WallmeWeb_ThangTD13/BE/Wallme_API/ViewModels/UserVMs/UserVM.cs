using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.ViewModels.UserVMs
{
    public class UserVM
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}

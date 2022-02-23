using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Wallme_API.Models
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
        public string Address { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
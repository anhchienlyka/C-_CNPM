using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Models
{
    public class IdentityCustomResult
    {
        public string Message { get; set; }

        public bool IsSuccessed { get; set; }

        public string Token { get; set; }
    }
}

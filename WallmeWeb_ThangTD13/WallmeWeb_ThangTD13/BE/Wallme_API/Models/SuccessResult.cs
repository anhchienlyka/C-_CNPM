using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Models
{
    public class SuccessResult : IdentityCustomResult
    {
        public SuccessResult()
        {
            this.IsSuccessed = true;
        }

        public SuccessResult(string token)
        {
            this.Token = token;
        }
    }
}

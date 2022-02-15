using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Models
{
    public class ErrorResult : IdentityCustomResult
    {
        public ErrorResult(string message)
        {
            this.Message = message;
            this.IsSuccessed = false;
        }

        public ErrorResult(IEnumerable<IdentityError> error)
        {
            this.Errors = error;
            this.IsSuccessed = false;
        }

        public IEnumerable<IdentityError> Errors { get; set; }
    }
}

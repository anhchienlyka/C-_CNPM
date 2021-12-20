using APIAppChat.Context;
using APIAppChat.Entities;
using APIAppChat.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.Repository.Implement
{
    public class UserRepository : RepositoryBase<AppUser>, IUserRepository
    {
  
        public UserRepository(DataContext context) : base(context)
        {

        }
       
    }
}

using APIAppChat.Context;
using APIAppChat.Entities;
using APIAppChat.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.UnitOfWork
{
 public   interface IUnitOfWork : IDisposable
    {
        IUserRepository AppUserRepository { get; }

        DataContext DataContext { get; }

        int SaveChanges();
    }
}

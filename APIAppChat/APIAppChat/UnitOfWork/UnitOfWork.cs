using APIAppChat.Context;
using APIAppChat.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {


        public UnitOfWork(DataContext context)
        {

        }
        public IUserRepository AppUserRepository => throw new NotImplementedException();

        public DataContext DataContext => throw new NotImplementedException();

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public int SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}

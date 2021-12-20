using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.Repository.Interface
{
    public interface IRepositoryBase<T>  where T : class
    {
        List<T> GetAll();

        T GetById(int id);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);
        

    }
}

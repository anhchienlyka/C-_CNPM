using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.Repository.Interface
{
    public interface IRepositoryBase<T>  where T : class
    {
       Task<List<T>> GetAll();

        Task<T> GetById(int id);

        Task Add(T entity);

        void Update(T entity);

        void Delete(T entity);
        

    }
}

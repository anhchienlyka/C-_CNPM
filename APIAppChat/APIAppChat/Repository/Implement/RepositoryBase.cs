using APIAppChat.Context;
using APIAppChat.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIAppChat.Repository.Implement
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {

        protected readonly DataContext _context;
        protected readonly DbSet<T> _dbSet;

        public RepositoryBase(DataContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }
        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public List<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T GetById(int id)
        {

            return _dbSet.Find(id);
        }

        public void Update(T entity)
        {

            _dbSet.Update(entity);
        }
    }
}

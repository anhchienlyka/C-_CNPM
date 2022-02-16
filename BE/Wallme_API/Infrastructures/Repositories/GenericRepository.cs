using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;

namespace Wallme_API.Infrastructures.Repositories
{
    public abstract class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly WallmeDbContext context;
        protected DbSet<TEntity> Dbset;

        public GenericRepository(WallmeDbContext context)
        {
            this.context = context;
            this.Dbset = this.context.Set<TEntity>();
        }

        public void Add(TEntity entity)
        {
            this.Dbset.Add(entity);
        }

        public void Delete(int id)
        {
            var entityExisting = this.Dbset.Find(id);
            if (entityExisting != null)
            {
                this.Dbset.Remove(entityExisting);
            }
        }

        public IQueryable<TEntity> GetAll()
        {
            //return this.Dbset.AsEnumerable().Skip(1).Take(2);
            return this.Dbset.AsQueryable();
            //return this.Dbset.AsQueryable().Skip(1).Take(2);
        }

        public TEntity GetById(int id)
        {
            return this.Dbset.Find(id);
        }

        public void Update(TEntity entity)
        {
            this.Dbset.Update(entity);
        }

        public IQueryable<TEntity> GetAllPaged()
        {
            return this.Dbset.AsQueryable();
        }
    }
}

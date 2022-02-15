using Wallme_API.Data;
using Wallme_API.Infrastructures.IRepositories;
using Wallme_API.Models;

namespace Wallme_API.Infrastructures.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(WallmeDbContext context) : base(context)
        {
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Infrastructures.Repositories
{
    public class Paging<T>
    {
        public int PageIndex { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalRow { get; set; }

        public List<T> ToPagedList (IQueryable<T> source, int pageIndex = 1, int pageSize = 6)
        {
            TotalRow = source.Count();
            if (pageIndex<=0)
            {
                PageIndex = 1;
            }
            else
            {
                PageIndex = pageIndex;
            }
            if (pageSize <= 0)
            {
                PageSize = TotalRow;
            }
            else
            {
                PageSize = pageSize;
            }
            TotalPages = (int)Math.Ceiling(TotalRow / (double)PageSize);
            return source.Skip((PageIndex - 1) * PageSize).Take(PageSize).ToList();
        }
    }
}

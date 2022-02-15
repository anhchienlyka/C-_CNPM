using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Constraint
{
    public class Constants
    {
        
    }
    public enum OrderStatus
    {
        Pending,
        Inprocess,
        Done,
    }
    public class PagingConstraint
    {
        public const string pageIndex = "pageindex";
        public const string pageSize = "pagesize";
        public const string totalPages = "totalpages";
    }
}

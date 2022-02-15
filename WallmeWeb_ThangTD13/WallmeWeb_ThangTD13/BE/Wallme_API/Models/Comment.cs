using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public int ProductId { get; set; }

        public Product  Product { get; set; }

        public string CommentHeader { get; set; }

        public string CommnentText { get; set; }

        public DateTime CommnetTime { get; set; }
    }
}

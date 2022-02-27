using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;

namespace Wallme_API.ViewModels.ProductVMs
{
    public class ProductVM
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public decimal Sale { get; set; }

        public int Inventory { get; set; }

        public int CategoryId { get; set; }

        public string Description { get; set; }
        public byte[] Picture { get; set; }

    }
}

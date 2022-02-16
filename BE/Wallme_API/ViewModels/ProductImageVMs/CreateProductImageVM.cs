using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.ViewModels.ProductImageVMs
{
    public class CreateProductImageVM
    {
        public string ImagePath { get; set; }

        public int Index { get; set; }

        public int ProductId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Services.ImageService
{
    public interface IImageService
    {
        public string SaveImage(string imageData);
    }
}

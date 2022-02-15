using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Wallme_API.Services.ImageService
{
    public class ImageService : IImageService
    {
        public string SaveImage(string imageData)
        {
            imageData = imageData.Replace("data:image/jpeg;base64,", "");
            string path = Directory.GetCurrentDirectory() + "/assets/productimages";
            string imageName = DateTime.Now.Ticks + ".jpg";
            string imagePath = Path.Combine(path, imageName);
            byte[] imageBytes = Convert.FromBase64String(imageData);
            File.WriteAllBytes(imagePath, imageBytes);
            return imageName;
        }
    }
}

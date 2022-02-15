using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.Data
{
    public class SeedData
    {
        private readonly WallmeDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public SeedData(WallmeDbContext context, UserManager<User> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public void Seed()
        {
            //seed role
            if (!_context.Roles.Any())
            {
                var roles = new Role[]
                {
                    new Role(){Name="admin", NormalizedName="ADMIN"},
                    new Role(){Name="user", NormalizedName="USER"},
                };
                _context.Roles.AddRange(roles);
                _context.SaveChanges();
            }
            if (_context.Categories.Any())
            {
                return;
            }

            List<Category> categories = new List<Category>()
            {
                new Category(){Name = "Cây cảnh phong thủy"},
                new Category(){Name = "Cây cảnh để bàn"},
                new Category(){Name = "Cây ban công"},
                new Category(){Name = "Sen đá"},
                new Category(){Name = "Cây thủy canh"},
                new Category(){Name = "Dụng cụ làm vườn"},
                new Category(){Name = "Chậu cây"},
            };
            _context.Categories.AddRange(categories);
            List<Product> products = new List<Product>()
            {
                new Product()
                {
                    Name = "Cây ngũ gia bì",
                    Price = 200000,
                    Sale = 15,
                    Inventory = 5,
                    Description = "Ngũ gia bì là loại thực vật thân gỗ, có kích thước nhỏ và dễ trồng bằng phương pháp nhân giống hoặc giâm cành. " +
                    "Ngày nay, cây ngũ gia bì ngày càng được ưa chuộng bởi có khả năng lọc sạch không khí, chống côn trùng, hạn chế bức xạ từ máy tính " +
                    "và đem đến phong thủy, sự may mắn cho gia chủ.",
                    Category = categories[1],
                },
                new Product()
                {
                    Name = "Cây phát tài",
                    Price = 180000,
                    Sale = 10,
                    Inventory = 10,
                    Description = "Cây phát tài không chỉ là cây cảnh giúp tô điểm thêm không gian trong nhà, giúp nhà bạn có màu xanh mát mà còn đem đến tài lộc," +
                    " sự may mắn và thịnh vượng cho gia chủ. Và cây phát tài rất hợp phong thủy với những ai tuổi Mão.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây trầu bà",
                    Price = 150000,
                    Sale = 0,
                    Inventory = 10,
                    Description = "Cây trầu bà (Hoàng Tam Điệp) là loại thân leo, có hoa, thường mọc thành cụm leo, có khả năng thanh lọc không khí, hạn chế bức xạ " +
                    "từ máy tính, sóng wifi, khói thuốc nên rất thích hợp trồng trong phòng ngủ hay phòng khách. Cây trầu bà có màu xanh nên gần như không kiêng kỵ bất " +
                    "cứ tuổi nào, tuy nhiên hợp nhất vẫn là những người tuổi Ngọ.",
                    Category = categories[1],
                },
                new Product()
                {
                    Name = "Cây Táo mèo",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Vạn Tuế",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Củ Cải",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Đào phai",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây lộc Lá",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Không Tên",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Mắt ngọc",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Cây Xà cừ",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Cây lộc vừng có tên khoa học là Barringtonia acutangula, là thực vật thân gỗ có đường kính lớn, hoa màu đỏ. Trong tiếng Hán, lộc vừng " +
                    "có ý nghĩa mang đến sự may mắn, tài lộc dồi dào, ngoài ra cây lộc vừng còn ý nghĩa về sự vững chắc, trường tồn và khả năng trừ tà, tăng dương khí trong nhà.",
                    Category = categories[0],
                },
            };
            _context.Products.AddRange(products);
            List<Product_Image> productImages = new List<Product_Image>()
            {
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/ngu-gia-bi-1.jpg",
                    Product = products[0],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-phat-tai-1.jpg",
                    Product = products[1],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-trau-ba-1-1.jpg",
                    Product = products[2],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-loc-vung-12.jpg",
                    Product = products[3],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[4],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[5],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[6],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[7],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[8],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[9],
                },
                new Product_Image()
                {
                    ImagePath = "https://khbvptr.vn/wp-content/uploads/2020/10/cay-cau-canh-1.jpg",
                    Product = products[10],
                }
            };      
            _context.ProductImages.AddRange(productImages);
            _context.SaveChanges();

        }

        public void SeedAdmin()
        {
            if (!_context.Users.Any())
            {
                var user = new User()
                {
                    UserName = "admin",
                    Email = "admin@gmail.com",
                };
                var result = _userManager.CreateAsync(user, "admin@1234");
                _userManager.AddToRoleAsync(user, "admin");
            }
        }
    }
}

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
                new Category(){Name = "Máy Ảnh"},
                new Category(){Name = "Máy Quay"},
                new Category(){Name = "Ống Kính"},
                new Category(){Name = "Âm Thanh"},
                new Category(){Name = "Phụ Kiện"},
                new Category(){Name = "Đồng hồ"},
                new Category(){Name = "Đồ Công Nghệ Khác"},
            };
            _context.Categories.AddRange(categories);
            List<Product> products = new List<Product>()
            {
                new Product()
                {
                    Name = "Máy Ảnh Canon Powershot SX620 HS - Đen",
                    Price = 200000,
                    Sale = 15,
                    Inventory = 5,
                    Description = "Canon 6D Mark II Kit EF 24-105 F4L IS II USM  là chiếc máy ảnh cao cấp được nâng cấp từ người đàn anh Canon 6D đã được sản xuất từ năm 2012. Phiên bản mới được nâng cấp cảm biến ảnh full-frame với độ phân giải 26.2 MP tích hợp công nghệ lấy nét Dual Pixel cùng chip xử lý hình ảnh DIGIC 7. Canon cũng nâng cấp khả năng quay phim với chuẩn 1080p/60fps và tích hợp đầy đủ các kết nối Wi-Fi, Bluetooth, NFC và GPS vào trong một chiếc máy thuộc dòng cao cấp.",
                    Category = categories[1],
                },
                new Product()
                {
                    Name = "Máy ảnh Canon EOS 6D Mark II Kit EF24-105mm F4",
                    Price = 180000,
                    Sale = 10,
                    Inventory = 10,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                  Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 6D Mark II (Nhập Khẩu)",
                    Price = 150000,
                    Sale = 0,
                    Inventory = 10,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                    Category = categories[1],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 5D Mark IV Body (Nhập Khẩu)",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                   Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Fujifilm X-T30 Mark II + Kit XF 18-55mm",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                   Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Fujifilm X-T30 Mark II Body/ Black",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                   Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                   Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 90D Kit EF",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 90D",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                   Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                   Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 90D",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                  Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 90D",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                    Category = categories[0],
                },
                new Product()
                {
                    Name = "Máy Ảnh Canon EOS 90D",
                    Price = 300000,
                    Sale = 5,
                    Inventory = 4,
                    Description = "Canon là một trong hai thương hiệu lớn nhất trên thị trường máy ảnh DSLR. Tuy nhiên, những sản phẩm của Canon lại vô cùng đa dạng, làm cho người mua gặp nhiều bối rối khi lựa chọn. Hãy cùng Điện máy XANH tìm hiểu các dòng máy ảnh cơ DSRL của Canon và đối tượng sử dụng nhé!",
                   Category = categories[0],
                },
            };
            _context.Products.AddRange(products);
            
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

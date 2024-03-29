﻿using AutoMapper;
using Wallme_API.Models;
using Wallme_API.ViewModels.CategorieVMs;
using Wallme_API.ViewModels.OrderDetailVMs;
using Wallme_API.ViewModels.OrderVMs;
using Wallme_API.ViewModels.ProductVMs;
using Wallme_API.ViewModels.UserVMs;

namespace Wallme_API.ViewModels.AutoMappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Category
            CreateMap<Category, CreateCategoryVM>().ReverseMap();
            CreateMap<Category, UpdateCategoryVM>().ReverseMap();
            CreateMap<Category, CategoryVM>().ReverseMap();

            //Product
            CreateMap<Product, CreateProductVM>().ReverseMap();
            CreateMap<Product, UpdateProductVM>().ReverseMap();
            CreateMap<Product, ProductVM>().ReverseMap();

            //Order
            CreateMap<Order, CreateOrderVM>().ReverseMap();

            //OrderItem
            CreateMap<OrderDetail, CreateOrderDetailVM>().ReverseMap();
            //User
            CreateMap<User, CreateUserVM>().ReverseMap();
            CreateMap<User, UpdateUserVM>().ReverseMap();
            CreateMap<User, UserVM>().ReverseMap();
            
        }
    }
}
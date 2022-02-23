using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Models;

namespace Wallme_API.Data
{
    public class WallmeDbContext:IdentityDbContext<User,Role,int>
    {
        public WallmeDbContext()
        {

        }

        public WallmeDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail>  OrderDetails { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Product_Image> ProductImages { get; set; }

        public DbSet <Comment> Comments { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-2KS3CPM\PCC;Database=Wallme;Trusted_Connection=True;MultipleActiveResultSets=true");
                optionsBuilder.LogTo(Console.WriteLine);
            }
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>(category =>
            {
                category.HasKey(x => x.Id);
            });

            modelBuilder.Entity<Order>(order =>
            {
                order.HasKey(x => x.Id);

                order.HasOne(x => x.User)
                        .WithMany(x => x.Orders)
                        .HasForeignKey(x => x.UserId);
            });

            modelBuilder.Entity<OrderDetail>(orderitem =>
            {
                orderitem.HasKey(x => new { x.OrderId, x.ProductId });

                orderitem.HasOne(x => x.Order)
                            .WithMany(x => x.OrderDetails)
                            .HasForeignKey(x => x.OrderId);

                orderitem.HasOne(x => x.Product)
                            .WithMany(x => x.OrderDetails)
                            .HasForeignKey(x => x.ProductId);
            });

            modelBuilder.Entity<Product>(product =>
            {
                product.HasKey(x => x.Id);

                product.HasOne(x => x.Category)
                        .WithMany(x => x.Products)
                        .HasForeignKey(x => x.CategoryId);
            });
            modelBuilder.Entity<Comment>(commnet =>
            {
                commnet.HasKey(x => x.Id);

                commnet.HasOne(x => x.Product)
                        .WithMany(x => x.Comments)
                        .HasForeignKey(x => x.ProductId);
            });
            modelBuilder.Entity<Product_Image>(productimage =>
            {
                productimage.HasKey(x => x.Id);

                productimage.HasOne(x => x.Product)
                            .WithMany(x => x.ProductImages)
                            .HasForeignKey(x => x.ProductId);
            });

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entityType.GetTableName(); if (tableName.StartsWith("AspNet"))
                {
                    entityType.SetTableName(tableName.Substring(6));
                }
            }
        }

    }
}

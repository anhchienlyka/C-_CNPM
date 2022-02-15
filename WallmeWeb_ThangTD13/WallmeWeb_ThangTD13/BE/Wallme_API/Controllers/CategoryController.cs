using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wallme_API.Data;
using Wallme_API.Infrastructures;
using Wallme_API.Infrastructures.Repositories;
using Wallme_API.Models;
using Wallme_API.ViewModels.CategorieVMs;

namespace Wallme_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly Paging<Category> pagingCategory = new Paging<Category>();

        public CategoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
      
        public List<CategoryVM> GetAll(int pageIndex = 1, int pageSize = -1)
        {
            var sourceIqueryable = _unitOfWork.CategoryRepository.GetAll();
            List<CategoryVM> result = new List<CategoryVM>();
            var categories = pagingCategory.ToPagedList(sourceIqueryable, pageIndex, pageSize);
            Response.Headers.Add("PageIndex", pagingCategory.PageIndex.ToString());
            Response.Headers.Add("PageSize", pagingCategory.PageSize.ToString());
            Response.Headers.Add("TotalPages", pagingCategory.TotalPages.ToString());

            foreach (var item in categories)
            {
                result.Add(_mapper.Map<CategoryVM>(item));
            }
            return result;
        }

        [HttpGet("{id}")]
        //[Route("{id}")]
        public CategoryVM GetById(int id)
        {
            var category = _unitOfWork.CategoryRepository.GetById(id);
            var result = _mapper.Map<CategoryVM>(category);
            return result;
        }

        [HttpPost]
        public void Create(CreateCategoryVM createCategoryVM)
        {
            Category category = _mapper.Map<Category>(createCategoryVM);

            _unitOfWork.CategoryRepository.Add(category);
            _unitOfWork.SaveChanges();
        }

        [HttpPut]
        public void Update(UpdateCategoryVM updateCategoryVM)
        {
            Category category = _mapper.Map<Category>(updateCategoryVM);
            _unitOfWork.CategoryRepository.Update(category);
            _unitOfWork.SaveChanges();
        }

        [HttpDelete]
        [Route("{id}")]
        public void Delete(int id)
        {
            _unitOfWork.CategoryRepository.Delete(id);
            _unitOfWork.SaveChanges();
        }

    }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: any;
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = res.body;
    })
  }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(res=>{
      console.log(res);
      this.getCategory();
    })
  }

}

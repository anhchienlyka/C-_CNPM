import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification/notification.service';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  categories: any;
  p: number = 1;
  constructor(private categoryService: CategoryService, private notificationService : NotificationService) { }

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
      console.log("statussss",res.status)
      if (res.status == 200) {
        this.notificationService.showSuccess('Success', 'Delete Successfully');
        this.getCategory();
      } else {
        this.notificationService.showError('Error', 'Delete Failed');
      }
    })
  }

}

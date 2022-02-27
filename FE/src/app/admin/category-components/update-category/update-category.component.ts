import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,private notificationService:NotificationService,private router:Router) { }

  categoryId: any;
  category: any;
  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.getCategoryById(this.categoryId);
  }

  categoryForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
  })

  onSubmit(){
    this.categoryService.updateCategory(this.categoryForm.value).subscribe(res=>{
     if(res.status==HttpStatusCode.Ok)
     {
      this.notificationService.showInfo('Success', 'Updated is Successfully');
      this.router.navigateByUrl('/admin/category');
    } else {
      this.notificationService.showError('Error', 'Updated is Fail');
     }
    });
  }

 
  getCategoryById(id: number){
    this.categoryService.getCategoryById(id).subscribe(res=>{
      // console.log(res);
      if(res.status == 200){
        this.category = res.body;
        this.categoryForm.controls['id'].setValue(this.category.id);
        this.categoryForm.controls['name'].setValue(this.category.name);
      }
    })
  }
  
}

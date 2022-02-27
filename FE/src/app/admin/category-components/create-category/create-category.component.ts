import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private notificationService : NotificationService, private router: Router,) { }

  ngOnInit(): void {
  }

  categoryForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  onSubmit(){
    this.categoryService.addCategory(this.categoryForm.value).subscribe(res=>{
      console.log("statusssssss",res.status)
      if (res.status === HttpStatusCode.Ok) {
        this.notificationService.showInfo('Success', 'Created is Successfully');
        this.router.navigateByUrl('/admin/category');
      } else {
        this.notificationService.showError('Error', 'Created is Fail');
      }
    });
  }

  get name(){
    return this.categoryForm.get('name');
  }
}

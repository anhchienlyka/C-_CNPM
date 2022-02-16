import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

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
      console.log(res);
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

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  categoryForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
  })

  onSubmit(){
    this.categoryService.addCategory(this.categoryForm.value).subscribe(res=>{
      console.log(res);
    });
  }

  get name(){
    return this.categoryForm.get('name');
  }
}

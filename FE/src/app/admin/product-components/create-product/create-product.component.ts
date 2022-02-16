import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/category.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  categories: any;
  images = [];

  productForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    sale: new FormControl('0',[Validators.required, Validators.min(0)]),
    inventory: new FormControl('',[Validators.required,Validators.min(0)]),
    categoryId: new FormControl('',[Validators.required,Validators.min(0)]),
    description: new FormControl('',[Validators.required]),
    // file: new FormControl(),
    fileSource: new FormControl(),
  });
  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.productForm.patchValue({
      categoryId: -1,
    })
  }

  submit(){
    this.productService.createProduct(this.productForm.value).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl('admin/product')
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = res.body;
    })
  }

  onFileChange(event){
    console.log(event);
    if(event.target.files && event.target.files[0]){
      var fileAmount = event.target.files.length;
      for(let i=0; i< fileAmount; i++){
        var reader = new FileReader();
        reader.onload = (event:any)=>{
          // console.log(event.target.result);
          this.images.push(event.target.result);

          this.productForm.patchValue({
            fileSource: this.images
          });
        }
        reader.readAsDataURL(event.target.files[i])
      }
    }
  }
  removeImage(indexImage: number){
    this.images.splice(indexImage,1);
  }

  get name(){
    return this.productForm.get('name');
  }
  get price(){
    return this.productForm.get('price');
  }
  get sale(){
    return this.productForm.get('sale');
  }
  get inventory(){
    return this.productForm.get('inventory');
  }
  get categoryId(){
    return this.productForm.get('categoryId');
  }
  get description(){
    return this.productForm.get('description');
  }
}

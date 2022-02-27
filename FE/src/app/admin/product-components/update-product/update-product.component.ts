import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditor4 } from 'ckeditor4-angular';
import { NotificationService } from 'src/app/notification/notification.service';
import { CategoryService } from 'src/app/shared/category.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  product : any;
  categories: any;
  productId:any;
  url: any; //Angular 11, for stricter type
  imgbase64: string = '';
  sanitizer: DomSanitizer;

  constructor(private productService: ProductService,private route: ActivatedRoute,private categoryService: CategoryService,  sanitizer: DomSanitizer , private notificationService:NotificationService, private routers : Router) {
    this.sanitizer = sanitizer;
    this.productId = this.route.snapshot.paramMap.get('id');
   }


  ngOnInit(): void {
    this.getCategories();
    this.getProductById(this.productId);
     
  }

  productForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    sale: new FormControl('0',[Validators.required, Validators.min(0)]),
    inventory: new FormControl('',[Validators.required,Validators.min(0)]),
    categoryId: new FormControl('',[Validators.required,Validators.min(0)]),
    description: new FormControl('',[Validators.required]),
    picture: new FormControl(),
  })




  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = res.body;
    })
  }
  getProductById(id: number){
    this.productService.getProductById(id).subscribe(res=>{

      if(res.status == 200){
        this.product = res.body;
        this.url = this.product.picture;
        this.productForm.controls['id'].setValue(this.productId);
        this.productForm.controls['name'].setValue(this.product.name);
        this.productForm.controls['price'].setValue(this.product.price);
        this.productForm.controls['sale'].setValue(this.product.sale);
        this.productForm.controls['inventory'].setValue(this.product.inventory);
        this.productForm.controls['categoryId'].setValue(this.product.categoryId);
        this.productForm.controls['description'].setValue(this.product.description);
      }
      else {
        console.log('get product by id failed!');
      }
    })
  }

  submit(){
    let model = this.productForm.value;
    if (!this.productForm.invalid) {
      if (this.imgbase64) {
        model.picture = this.imgbase64;
      } else {
        model.picture = this.product.picture;
      }
      this.productService.updateProduct(model).subscribe((res) => {
        console.log("statusss",res.status)
        if (res.status == 200) {
          this.notificationService.showSuccess('Success', `Update ${model.name} Sucessfully`);
          this.routers.navigateByUrl('/admin/product');
        } else {
          this.notificationService.showError('Error', 'Updated Fail');
        }
      });
    }
    else {
      this.notificationService.showWarning("Warning", "Please Full Fill The Form");
    }
  }
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsBinaryString(file);
      reader.onload = (event) => {
        let binaryString = event.target?.result as string;
        if (binaryString) {
          this.imgbase64 = btoa(binaryString);
          this.url = this.imgbase64;
        }
      };
    }
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

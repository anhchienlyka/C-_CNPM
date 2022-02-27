import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { CategoryService } from 'src/app/shared/category.service';
import { CreateProduct } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  categories: any;
  imgbase64: string = '';
  url: any;
  sanitizer: DomSanitizer;
  productForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    sale: new FormControl('0',[Validators.required, Validators.min(0)]),
    inventory: new FormControl('',[Validators.required,Validators.min(0)]),
    categoryId: new FormControl('',[Validators.required,Validators.min(0)]),
    description: new FormControl('',[Validators.required]),
    // file: new FormControl(),
    picture: new FormControl(),
  });

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private httpClient: HttpClient,
    private router: Router,
    sanitizer: DomSanitizer,
    private notificationService : NotificationService) {

      this.sanitizer = sanitizer;
     }

  ngOnInit(): void {
    this.getCategories();
    this.productForm.patchValue({
      categoryId: -1,
    })
  }

  submit(){
    let model: CreateProduct = this.productForm.value;
    if(!this.productForm.invalid){
      if (this.imgbase64 != '') {
        model.picture = this.imgbase64;
      }
      else {
        model.picture = this.getDefaultImageData() as string;
      }
    this.productService.createProduct(model).subscribe(res=>{
      this.router.navigateByUrl('admin/product')
      if (res.status === HttpStatusCode.Ok) {
        this.notificationService.showInfo('Success', 'Created is Successfully');
        this.router.navigateByUrl('admin/product')
      } else {
        this.notificationService.showError('Error', 'Created is Fail');
      }
    })
  }
  else{
    this.notificationService.showWarning("Warning","Please Full Fill The Form");
  }
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = res.body;
    })
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


  getDefaultImageData() {
    let img = document.getElementById("default-img") as HTMLImageElement;
    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.naturalWidth as number;
    canvas.height = img.naturalHeight as number;
    let ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/png");
      let data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      console.log(data);
      return data;
    }
    return undefined;
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

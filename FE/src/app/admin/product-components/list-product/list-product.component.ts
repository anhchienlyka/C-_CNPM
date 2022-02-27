import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: any;
  pageIndex: number=1;
  pageSize: number=2;
  totalPages: number;
  p : number = 1;
  url: string = "/admin/product";
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
   private notificationService : NotificationService
    
    ) { }

  ngOnInit(): void {
     this.products = this.getProducts();
     
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(res=>{
      console.log("delete status",res.status);
      if (res.status == 200) {
        this.notificationService.showSuccess('Success', 'Delete Successfully');
        this.getProducts();
      } else {
        this.notificationService.showError('Error', 'Delete Failed');
      }
    });
  }

  getProducts(){
    this.productService.GetAllProducts().subscribe(res=>{
     this.products = res.body;
    })
  }

}

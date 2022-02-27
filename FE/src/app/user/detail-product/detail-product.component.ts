import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { environment } from 'src/environments/environment';
import { Cart } from '../cart/cart.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  coutProduct:number=0;
  product: Product ;
  productId: any;
  quantity: number = 1;
  sanitizer: DomSanitizer;
  constructor(private productService: ProductService, 
    private route: ActivatedRoute, 
    private cartService: CartService,
    sanitizer: DomSanitizer,
    private notifyService : NotificationService
    ) { 
      this.sanitizer = sanitizer;
    }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductById(this.productId);
  }

  getProductById(id: number){
    this.productService.getProductById(id).subscribe(res=>{
      this.product = res.body;
      console.log("productdetail",this.product)
      
    })
  }
  showToasterWarning(){
    this.notifyService.showWarning("Số lượng hàng không đủ", "Thông báo")
}
  addToCart(product:Product){
    this.coutProduct++;
    
    if(this.quantity>this.product.inventory||this.coutProduct>this.product.inventory){
      console.log("Số lượng trong kho không đủ!");
      this.showToasterWarning();
      return;
    }
    let productOrder: ProductOrder = {
      price: product.price,
      productId: product.id,
      productName: product.name,
      quantity: this.quantity,
      sale: product.sale,
      picture:product.picture
    }; 
    this.cartService.addToCart(productOrder);
    Cart.callBack.emit();
  }
}

import { Component, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productsInCart: ProductOrder[];
  quantity: any;
  sanitizer: DomSanitizer;
  productDetail:Product;
 
  constructor(private cartService: CartService, private route:Router,  sanitizer: DomSanitizer, private notificationSevice:NotificationService, private productService:ProductService) { 
    this.sanitizer= sanitizer;
  }

  ngOnInit(): void {
    this.productsInCart = this.cartService.getProductInCart();
  }

  get totalPrice(): number{
    return this.productsInCart.reduce((acc,cur)=>acc+cur.price*cur.quantity*(100-cur.sale)/100,0);
  }

  get totalCost():number{
   return this.totalPrice + 50000;
  }
  updateToLocal(productOrder: ProductOrder){
    this.cartService.updateCart(productOrder);
    this.productsInCart = this.cartService.getProductInCart();

    Cart.callBack.emit();
  }
  delete(item:any) {
    this.cartService.removeCartItem(item);
    this.productsInCart=this.cartService.getProductInCart();
    Cart.callBack.emit();
  }

  checkNumber()
  {
    var products = this.cartService.getProductInCart();
    if(products.length>0){
      products.forEach(product => {
        this.productService.getProductById(product.productId).subscribe(res=>{
          this.productDetail = res.body;  
        if(product.quantity>this.productDetail.inventory)
        {
          this.route.navigateByUrl('/cart');
          this.notificationSevice.showError("Error","Not enough items in stock")
        }
        })
      });
      this.route.navigateByUrl('/cart/checkout');
    }else{
      this.route.navigateByUrl('/cart');
     this.notificationSevice.showWarning("Warning","Shopping cart is empty")
    }
  }
}
export class Cart {
  static callBack = new EventEmitter();
}

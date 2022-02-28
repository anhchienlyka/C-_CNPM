import { Component, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  total_price : number;
  productDetail:Product;
  totalCost:number
  constructor(private cartService: CartService,   sanitizer: DomSanitizer, private notificationSevice:NotificationService, private productService:ProductService) { 
    this.sanitizer= sanitizer;
  }

  ngOnInit(): void {
    this.productsInCart = this.cartService.getProductInCart();
    this.total_price = this.totalPrice;
    this.totalCost = this.total_price+50000;
  }

  get totalPrice(): number{
    return this.productsInCart.reduce((acc,cur)=>acc+cur.price*cur.quantity*(100-cur.sale)/100,0);
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


  getProductById(id: number){
    this.productService.getProductById(id).subscribe(res=>{
      this.productDetail = res.body;  
    })
  }
  checkNumber()
  {
    var products = this.cartService.getProductInCart();
    console.log("productttttt",products)
    if(products!=null){
      products.forEach(product => {
        this.getProductById(product.productId)
        console.log("productdetaillllllll",this.productDetail)
        if(product.quantity>this.productDetail.inventory)
        {
          this.notificationSevice.showError("Error","Not enough items in stock")
        }
      });
      
    }else{
     this.notificationSevice.showWarning("Warning","Shopping cart is empty")
    }

  }
}
export class Cart {
  static callBack = new EventEmitter();
}

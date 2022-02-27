import { Component, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  productsInCart: ProductOrder[];
  quantity: any;
  sanitizer: DomSanitizer;
  constructor(private cartService: CartService,   sanitizer: DomSanitizer) { 
    this.sanitizer= sanitizer;
  }

  ngOnInit(): void {
    this.productsInCart = this.cartService.getProductInCart();
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
}
export class Cart {
  static callBack = new EventEmitter();
}

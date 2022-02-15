import { Injectable } from '@angular/core';
import { ProductOrder } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(productOrder: ProductOrder){
    var listProductInCart = this.getProductInCart();
    //if wallme-cart in local storage is empty
    if(listProductInCart==null){
      listProductInCart = [];
      listProductInCart.push(productOrder);
      localStorage.setItem('wallme-cart',JSON.stringify(listProductInCart));
      return;
    }
    //If add a item already exist in wallme-cart, then add quantity 1
    var productExistInCart = listProductInCart.find(({productId})=> productId === productOrder.productId);
    if(!productExistInCart){
      listProductInCart.push(productOrder);
      localStorage.setItem('wallme-cart',JSON.stringify(listProductInCart));
      return;
    }
    //If add a new item not exist in wallme-cart
      productExistInCart.quantity += productOrder.quantity;
      localStorage.setItem('wallme-cart',JSON.stringify(listProductInCart));
  }

  getProductInCart(){
    let data: ProductOrder[] = JSON.parse(localStorage.getItem('wallme-cart'));
    return data;
  }

  calculateTotalPrice(){
    var productsOrder = this.getProductInCart();
    let totalPrice = 0;
    productsOrder.forEach(product => {
      totalPrice += product.price*product.quantity*(100-product.sale)/100;
    });
    return totalPrice;
  }

  updateCart(productOrder: ProductOrder){
    var listProductInCart = this.getProductInCart();
    var productExistInCart = listProductInCart.find(({productId})=> productId === productOrder.productId);
    //check if quantity = 0, remove from cart
    if(productOrder.quantity == 0){
      listProductInCart = listProductInCart.filter(product=>product.productId !== productOrder.productId);
      localStorage.setItem('wallme-cart',JSON.stringify(listProductInCart));
    }
    productExistInCart.quantity = productOrder.quantity;
    localStorage.setItem('wallme-cart',JSON.stringify(listProductInCart));

  }
}

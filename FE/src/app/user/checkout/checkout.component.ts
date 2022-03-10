import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { OrderDetail } from 'src/app/shared/orderDetail.model';
import { User } from 'src/app/shared/user.model';
import { Cart } from '../cart/cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: User;
  productsInCart: ProductOrder[];
  quantity?: any; 
  total_price?:number;
  totalCost?: number;
  orderDetailsInOrder: OrderDetail[] = [];
  constructor(private authenticationService: AuthenticationService,private cartService: CartService, private orderService:OrderService) {}

  
  
  ngOnInit(): void {
    this.getCurrentUser();
    this.productsInCart = this.cartService.getProductInCart();
    this.total_price = this.totalPrice;
    this.totalCost =  this.totalPrice+50000;
   this.checkoutAccount();
    this.transfer();
  }

  currentUserForm = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
  });

  checkoutAccount() {
    this.currentUserForm.controls['fullname'].setValue(this.currentUser.fullname);
    this.currentUserForm.controls['username'].setValue(this.currentUser.username);
    this.currentUserForm.controls['address'].setValue(this.currentUser.address);
    this.currentUserForm.controls['phoneNumber'].setValue(this.currentUser.phoneNumber);
    this.currentUserForm.controls['email'].setValue(this.currentUser.email);
    
  }
  get totalPrice(): number{
    return this.productsInCart.reduce((acc,cur)=>acc+cur.price*cur.quantity*(100-cur.sale)/100,0);
  }
  
  getCurrentUser() {
    this.currentUser = this.authenticationService.getCurrentUser();
  }

  transfer(){
    for(let i = 0 ; i< this.productsInCart.length; i++ ){
      let object1:OrderDetail = {
        orderId: 0,
        productId: 0,
        price: 0,
        total_Price: 0,
        quantity:0
      }
      object1.productId = this.productsInCart[i].productId;
      object1.price = this.productsInCart[i].price;
      object1.total_Price =this.totalPrice;
      object1.quantity= this.productsInCart[i].quantity;
      this.orderDetailsInOrder.push(object1)
    }

    // console.log(this.orderDetailsInOrder)
  }

  onSubmit(){
    let newDate = new Date();
    var order: Order ={
      
      userId: this.currentUser.id,
      orderDate: newDate.toISOString(),
      orderDetails: this.orderDetailsInOrder,
      totalPrice: this.totalCost,
      status: 1,
      payment: true,
      user:null
    };
    this.orderService.addOrder(order).subscribe();
    let data: string = JSON.stringify(order);
    window.localStorage.removeItem('wallme-cart');
    Cart.callBack.emit();
  }
}

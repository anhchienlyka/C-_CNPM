import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: User;
  productsInCart: ProductOrder[];
  quantity: any; 
  total_price:number;
  totalCost: number;
  productsInOrder: ProductInOrderToPost[];
  constructor(private authenticationService: AuthenticationService,private cartService: CartService, private orderService:OrderService) {}

  ngOnInit(): void {
    this.getCurrentUser();
    console.log('usserrrrrr', this.currentUser);
    this.checkoutAccount();
    this.productsInCart = this.cartService.getProductInCart();
    this.total_price = this.totalPrice;
    this.totalCost = this.total_price+30000;
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
    for(let i=0;i<this.productsInCart.length;i++){
      let product:
      this.productsInOrder.
    }
  }

  onSubmit(){
    var order: Order ={
      userId : this.currentUser.id,
      orderDate : "2022-02-23",
      orderDetails :

    };
    this.orderService.addOrder(order).subscribe(x=>);
  }
  
}

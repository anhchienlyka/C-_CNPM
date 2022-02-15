import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { CartService } from 'src/app/shared/cart.service';
import { CategoryService } from 'src/app/shared/category.service';
import { ProductService } from 'src/app/shared/product.service';
import { User } from 'src/app/shared/user.model';
import { Cart } from '../cart/cart.component';
import { Login } from '../login/login.component';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  categories: any;
  numberOfProductInCart: number = 0;
  currentUser: User;
  isAdmin: boolean = false;
  findForm = new FormGroup({
    findValue: new FormControl(),
  })

  constructor(
    private categoryService: CategoryService, 
    private cartService: CartService, 
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getNumberOfProductInCart();
    Cart.callBack.subscribe(() => this.getNumberOfProductInCart());
    this.getCurrentUser();
    Login.callBack.subscribe(()=> this.getCurrentUser());
  }
  

  getCategories(){
    this.categoryService.getCategories().subscribe(res=>{
      this.categories = res.body;
    })
  }

  getNumberOfProductInCart(){
    var products = this.cartService.getProductInCart();
    if(products!=null){
      let sum = 0;
      products.forEach(product => {
         sum += product.quantity;
      });
      this.numberOfProductInCart = sum;
    }else{
      this.numberOfProductInCart = 0;
    }
    
  }

  onSubmit(){
    this.router.navigateByUrl(`findProductsByname/${this.findForm.controls['findValue'].value}`);
  }

  getCurrentUser(){
    this.currentUser = this.authenticationService.getCurrentUser();
    if(this.authenticationService.isUserHaveRole("admin")){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }

  logout(){
    this.authenticationService.logout();
    Login.callBack.emit();
    Cart.callBack.emit();
  }
}

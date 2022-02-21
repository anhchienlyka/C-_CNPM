import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CardProductComponent } from './card-product/card-product.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductsByCategoryComponent } from './list-products-by-category/list-products-by-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FindProductsByNameComponent } from './find-products-by-name/find-products-by-name.component';
import { PaginationComponent } from './pagination/pagination.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CompleteComponent } from './complete/complete.component';



@NgModule({
  declarations: [
    HomeComponent,
    UserLayoutComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CardProductComponent,
    DetailProductComponent,
    ListProductsByCategoryComponent,
    FindProductsByNameComponent,
    PaginationComponent,
    UnauthorizedComponent,
    CheckoutComponent,
    CompleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginationComponent,
  ]
})
export class UserModule { }

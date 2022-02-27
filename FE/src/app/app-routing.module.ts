import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { CreateCategoryComponent } from './admin/category-components/create-category/create-category.component';
import { ListCategoryComponent } from './admin/category-components/list-category/list-category.component';
import { CreateProductComponent } from './admin/product-components/create-product/create-product.component';
import { ListProductComponent } from './admin/product-components/list-product/list-product.component';
import { UpdateProductComponent } from './admin/product-components/update-product/update-product.component';
import { UpdateCategoryComponent } from './admin/category-components/update-category/update-category.component';
import { ListUserComponent } from './admin/user-components/list-user/list-user.component';
import { UpdateUserComponent } from './admin/user-components/update-user/update-user.component';
import { HomeComponent } from './user/home/home.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { CartComponent } from './user/cart/cart.component';
import { DetailProductComponent } from './user/detail-product/detail-product.component';
import { ListProductsByCategoryComponent } from './user/list-products-by-category/list-products-by-category.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { FindProductsByNameComponent } from './user/find-products-by-name/find-products-by-name.component';
import { UnauthorizedComponent } from './user/unauthorized/unauthorized.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { CompleteComponent } from './user/complete/complete.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {  path: 'cart', component: CartComponent},
      { path: 'cart/checkout', component: CheckoutComponent },
      { path: 'detail/:id', component: DetailProductComponent },
      { path: 'bycategory/:id', component: ListProductsByCategoryComponent },
      {
        path: 'findProductsByname/:name',
        component: FindProductsByNameComponent,
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
      {path:'complete',component:CompleteComponent}
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: ListCategoryComponent },
      {
        path: 'category',
        children: [
          { path: '', component: ListCategoryComponent },
          { path: 'create', component: CreateCategoryComponent },
          { path: 'update/:id', component: UpdateCategoryComponent },
        ],
      },
      {
        path: 'product',
        children: [
          { path: '', component: ListProductComponent },
          { path: 'create', component: CreateProductComponent },
          { path: 'update/:id', component: UpdateProductComponent },
        ],
      },
      {
        path: 'user',
        children: [
          { path: '', component: ListUserComponent },
          { path: 'update/:id', component: UpdateUserComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

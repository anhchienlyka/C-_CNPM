import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ListCategoryComponent } from './category-components/list-category/list-category.component';
import { CreateCategoryComponent } from './category-components/create-category/create-category.component';
import { UpdateCategoryComponent } from './category-components/update-category/update-category.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProductComponent } from './product-components/list-product/list-product.component';
import { CreateProductComponent } from './product-components/create-product/create-product.component';
import { UpdateProductComponent } from './product-components/update-product/update-product.component';
import { ListUserComponent } from './user-components/list-user/list-user.component';
import { UpdateUserComponent } from './user-components/update-user/update-user.component';
import { PaginationComponent } from '../user/pagination/pagination.component';
import { UserModule } from '../user/user.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import { ListOrderComponent } from './order-components/list-order/list-order.component';
import { UpdateOrderComponent } from './order-components/update-order/update-order.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHomeComponent,
    ListCategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    ListProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ListUserComponent,
    UpdateUserComponent,
    ListOrderComponent,
    UpdateOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule,
    ReactiveFormsModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AdminLayoutComponent]
})
export class AdminModule { }

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateProductComponent } from '../admin/product-components/update-product/update-product.component';
import { CreateProduct, Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

    // https://localhost:44392/Product?pageIndex=1&pageSize=0
  getProducts(pageIndex: number, pageSize: number):Observable<HttpResponse<Product[]>>{
    return this.httpClient.get<Product[]>(this.apiUrl+`product?pageindex=${pageIndex}&pagesize=${pageSize}`,{observe: 'response'});
  }

  getProductById(id: number){
    var url = this.apiUrl + `product/${id}`;
    return this.httpClient.get<Product>(url,{observe: 'response'});
  }

  getProductsByCategoryId(id: number){
    var url = this.apiUrl + `Product/GetProductsByCategory?categoryId=${id}`;
    return this.httpClient.get<Product>(url, {observe: 'response'});
  }

  createProduct(product: CreateProduct){
    var url = this.apiUrl + 'product';
    var data = JSON.stringify(product);
    var options = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    return this.httpClient.post(url,data,options);
  }

  findProductsByName(name: string){
    var url = this.apiUrl + `Product/FindProductByName?name=${name}`;
    return this.httpClient.get<Product[]>(url, {observe: 'response'});
  }

  // https://localhost:44392/Product?id=12
  deleteProduct(id: number){
    var url = this.apiUrl+`product?id=${id}`;
    return this.httpClient.delete(url);
  }

}

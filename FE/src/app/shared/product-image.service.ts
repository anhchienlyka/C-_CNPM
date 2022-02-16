import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductImage } from './product-image.model';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getImageByProductId(id: number):Observable<ProductImage[]>{
    var url = this.apiUrl+`ProductImage/${id}`;
    return this.httpClient.get<ProductImage[]>(url,{observe: 'body'});
  }
}

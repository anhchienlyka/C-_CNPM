import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Order } from './order.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient : HttpClient) { }


  getOrders():Observable<HttpResponse<Order[]>>{
    return this.httpClient.get<Order[]>(this.apiUrl+'order',{observe: 'response'});
  }


  addOrder(order: Order){
    var data = JSON.stringify(order);
    var url = this.apiUrl+'order';
    var options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    return this.httpClient.post<any>(url, data, options);
  }








}

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CreateCategory } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService   {

  private apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {;
   }


  getCategories():Observable<HttpResponse<Category[]>>{
    return this.httpClient.get<Category[]>(this.apiUrl+'category',{observe: 'response'});
  }

  addCategory(category: CreateCategory){
    var data = JSON.stringify(category);
    var url = this.apiUrl+'category';
    var options = {
        observe: 'response' as const,
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    return this.httpClient.post<any>(url, data, options);
  }

  updateCategory(category: Category){
    var data = JSON.stringify(category);
    var url = this.apiUrl + 'category';
    var options ={
      observe: 'response' as const,
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
    console.log(data);
    return this.httpClient.put(url,data, options);
  }

  getCategoryById(id: number){
    var url = this.apiUrl+`category/${id}`;
    return this.httpClient.get<Category>(url,{observe:'response'});
  }
  
  deleteCategory(id: number){
    var url = this.apiUrl+`category/${id}`;
    return this.httpClient.delete(url,{
      observe :'response'
    });
  }
}

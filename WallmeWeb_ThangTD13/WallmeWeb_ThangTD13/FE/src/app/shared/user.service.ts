import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsers():Observable<User[]>{
    var url = this.apiUrl+'user';
    return this.httpClient.get<User[]>(url,{observe: 'body'})
  }

  updateUser(){

  }

  deleteUser(id: number){ 
    var url = this.apiUrl+`user/${id}`;
    return this.httpClient.delete(url);
  }
}

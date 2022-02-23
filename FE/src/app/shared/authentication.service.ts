import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(formData: any){
    var option={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      }),
      responseType:'text' as const
    };
    return this.httpClient.post(this.apiUrl+'account/login', formData,option);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(formData: any){
    console.log('formDataaaaa',formData)
    var option={
      header: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      responseType:'text' as const
    };
    return this.httpClient.post(this.apiUrl+'account/register',formData,option);
  }

  getCurrentUser():User{
    var token = localStorage.getItem('token');
    var data = this.jwtHelper.decodeToken(token);
    if(this.jwtHelper.isTokenExpired(token)){
      return null;
    }
    if(data!==null){
      var user = new User();
      user.id = data?.userId;
      user.email = data?.email;
      user.username = data?.username;
      user.role = data?.role;
      user.phoneNumber = data.phoneNumber;
      user.adrress= data.address;
      user.phoneNumber= data.fullName;
      return user;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('wallme-cart');
  }


  isUserHaveRole(roleName: string):boolean{
    var user = this.getCurrentUser();
    if(user===null){
      return false;
    }else{
      if(user.role.includes(roleName,0)){
        return true;
      }
      return false;
    }
  }
}

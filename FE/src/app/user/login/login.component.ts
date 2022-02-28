import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean = false;
  constructor(private authenticationService: AuthenticationService, private route: Router,private notificationSevice: NotificationService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  onSubmit(){
    this.authenticationService.login(this.loginForm.value).subscribe(res=>{
      localStorage.setItem('token',res);
      Login.callBack.emit();
      this.currentUser = this.authenticationService.getCurrentUser();
      if(this.authenticationService.isUserHaveRole("admin")){
        this.isAdmin=true;
        this.route.navigateByUrl('/admin');
        this.notificationSevice.showSuccess("Success","Login Successfully");
      }else{
        this.isAdmin=false;
        this.route.navigateByUrl('/');
        this.notificationSevice.showSuccess("Success","Login Successfully");
      }       
    })

  
  }
  

  getCurrentUser(){
    this.currentUser = this.authenticationService.getCurrentUser();
    console.log("userInforrrrr",this.currentUser)
    if(this.authenticationService.isUserHaveRole("admin")){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
  }


}
export class Login{
  static callBack = new EventEmitter();
}
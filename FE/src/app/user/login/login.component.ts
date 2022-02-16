import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: Router) { }

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
      this.route.navigateByUrl('/');
    })
  }
  
}
export class Login{
  static callBack = new EventEmitter();
}
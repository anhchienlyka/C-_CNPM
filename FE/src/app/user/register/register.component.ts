import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required]),
    username: new FormControl('',[Validators.minLength(10), Validators.required]),
    password: new FormControl('',[Validators.minLength(8), Validators.required]),
  })
  message: string = "";
  thang: string = "";
  isSuccess: boolean = false;
  constructor(
    private authenticaionService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authenticaionService.register(this.registerForm.value).subscribe(res=>{
      var response = JSON.parse(res);
      console.log(response);
      if(response.isSuccessed==true){
        this.isSuccess = true;
        this.message = "Đăng kí thành công";
        this.router.navigateByUrl('/login');
      }else{
        this.isSuccess = false;
      }
      if(response.errors?.[0].code=="DuplicateUserName")
      this.message = "Username đã tồn tại";
    });
  }

  get email(){
    return this.registerForm.get('email');
  }
  get username(){
    return this.registerForm.get('username');
  }
  get password(){
    return this.registerForm.get('password');
  }
}


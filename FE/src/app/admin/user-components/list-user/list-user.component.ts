import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/notification.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl:'./list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: any ;
  p: number = 1;
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService:NotificationService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    return this.userService.getUsers().subscribe(res=>{
      console.log("ressssssss",res)
      this.users = res;
    })
  }

  deleteUser(id: number){
    return this.userService.deleteUser(id).subscribe(res=>{
      this.notificationService.showSuccess("Sucssess","Delete User Sucsessfully")
      this.getUsers();
    })
  }

}

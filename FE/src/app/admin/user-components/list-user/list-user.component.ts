import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users: any;
  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    return this.userService.getUsers().subscribe(res=>{
      this.users = res;
    })
  }

  deleteUser(id: number){
    return this.userService.deleteUser(id).subscribe(res=>{
      console.log(res);
      // this.router.navigateByUrl('/admin/user')
      this.getUsers();
    })
  }

}

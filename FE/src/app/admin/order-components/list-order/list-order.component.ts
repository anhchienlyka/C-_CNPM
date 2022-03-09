import { Component, OnInit } from '@angular/core';
import { Order, OrderVms } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {
  p: number = 1;
  orders: OrderVms[];
  user: User[];

  constructor(
    private orderService: OrderService,
    private userSevice: UserService
  ) {}

  ngOnInit(): void {
    this.getListOrder();
  }

  getListOrder() {
    this.orderService.getOrders().subscribe((res) => {
      this.orders = res.body;
      console.log("orderrrr",this.orders)
    });

   
  }

  getUserInfor(id: any) {
    let userInfor : User;
    this.userSevice.getUserById(id).subscribe((res) => {
      userInfor = res;
     // console.log("userssss",userInfor)
    });
    return userInfor;
  }
  deleteUser(p) {}
}

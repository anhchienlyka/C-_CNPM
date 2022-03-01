import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/order.model';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss'],
})
export class ListOrderComponent implements OnInit {
  p: number = 1;
  orders : Order[]
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

    this.getListOrder();
  }

  getListOrder() {
    this.orderService.getOrders().subscribe((res) =>{
     this.orders = res.body
    });
    
  }


getUserInfor(id:any)
{

}
  deleteUser(p)
  {

  }


}

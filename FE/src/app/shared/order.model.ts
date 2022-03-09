import { DecimalPipe } from "@angular/common";
import { OrderDetail } from "./orderDetail.model";
import { User } from "./user.model";



export interface Order{
   
    userId: number,
    orderDate: string,
    totalPrice: number,
    status: number,
    payment: boolean,
    orderDetails:OrderDetail[],
    user:User
}

export interface OrderVms{
    oderId: number,
    userId: number,
    orderDate: string,
    totalPrice: number,
    status: number,
    payment: boolean,
    fullName: string,
    address: string
}
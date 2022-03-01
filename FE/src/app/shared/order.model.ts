import { DecimalPipe } from "@angular/common";
import { OrderDetail } from "./orderDetail.model";



export interface Order{
   
    userId: number,
    orderDate: string,
    totalPrice: number,
    status: number,
    payment: boolean,
    orderDetails:OrderDetail[]
}
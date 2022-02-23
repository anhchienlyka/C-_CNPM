import { DecimalPipe } from "@angular/common";
import { orderDetail } from "./orderDetail.model";


export interface order{
    id:number
    userId: number,
    orderDate: Date,
    totalPrice: number,
    status: number,
    payment: boolean,
    orderDetails:orderDetail
}
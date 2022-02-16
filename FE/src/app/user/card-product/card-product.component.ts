import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { ProductImageService } from 'src/app/shared/product-image.service';
import { Product } from 'src/app/shared/product.model';
import { environment } from 'src/environments/environment';
import { Cart } from '../cart/cart.component';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {

  @Input() product!: Product
  imagePath: string;
  coutProduct:number=0;
  constructor(private productImageService: ProductImageService,
     private cartService: CartService,
     private notifyService : NotificationService) { 
  }

  ngOnInit(): void {
    this.imagePath = this.product?.productImages[0].imagePath;
  }
  showToasterWarning(){
    this.notifyService.showWarning("Số lượng hàng không đủ", "Thông báo")
}
  addToCart(product: Product){
    this.coutProduct++;
    if(this.coutProduct>this.product.inventory)
    {
      this.showToasterWarning();
      return;
    }
    let productOrder: ProductOrder = {
      imagePath: '',
      price: product.price,
      productId: product.id,
      productName: product.name,
      quantity: 1,
      sale: product.sale
    };
    this.cartService.addToCart(productOrder);
    Cart.callBack.emit();
  }
}

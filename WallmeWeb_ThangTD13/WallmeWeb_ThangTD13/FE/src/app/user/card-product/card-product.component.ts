import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  imagePath: string
  constructor(private productImageService: ProductImageService, private cartService: CartService) { 
  }

  ngOnInit(): void {
    this.imagePath = this.product?.productImages[0].imagePath;
  }

  addToCart(product: Product){
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

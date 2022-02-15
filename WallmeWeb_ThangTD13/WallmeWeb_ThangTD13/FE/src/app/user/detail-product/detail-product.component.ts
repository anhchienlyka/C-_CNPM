import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOrder } from 'src/app/shared/cart.model';
import { CartService } from 'src/app/shared/cart.service';
import { ProductImageService } from 'src/app/shared/product-image.service';
import { Product, ProductImage } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { environment } from 'src/environments/environment';
import { Cart } from '../cart/cart.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product: Product;
  productId: any;
  images!: ProductImage[];
  imageUrl = environment.imageUrl;
  quantity: number = 1;
  constructor(private productService: ProductService, 
    private route: ActivatedRoute, 
    private productImageService: ProductImageService, 
    private cartService: CartService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductById(this.productId);
  }

  getProductById(id: number){
    this.productService.getProductById(id).subscribe(res=>{
      this.product = res.body;
      this.images = this.product.productImages;  
      console.log("imggggg",this.images)
    })
  }

  addToCart(product:Product){
    if(this.quantity>this.product.inventory){
      console.log("Số lượng trong kho không đủ!");
      return;
    }
    let productOrder: ProductOrder = {
      imagePath: '',
      price: product.price,
      productId: product.id,
      productName: product.name,
      quantity: this.quantity,
      sale: product.sale
    }; 
    this.cartService.addToCart(productOrder);
    Cart.callBack.emit();
  }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/cart.service';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any;
  pageIndex: number=1;
  pageSize: number=6;
  totalPages: number;
  url: string = "";
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      if(params.get('pageIndex')!=null){
        this.pageIndex = Number(params.get('pageIndex'));
        this.pageSize = Number(params.get('pageSize'));
      }
      this.getProduct();
    })
  }

  getProduct(){
    this.productService.getProducts(this.pageIndex,this.pageSize).subscribe(res=>{
      this.totalPages = Number(res.headers.get('totalpages'));
      this.products = res.body;
    })
  }
}

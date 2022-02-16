import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-list-products-by-category',
  templateUrl: './list-products-by-category.component.html',
  styleUrls: ['./list-products-by-category.component.scss']
})
export class ListProductsByCategoryComponent implements OnInit {

  products: any;
  categoryId: any
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.categoryId = params['id'];
      this.getProductsByCategoryId(this.categoryId);
    })
  }

  getProductsByCategoryId(id: number){
    this.productService.getProductsByCategoryId(id).subscribe(res=>{
      this.products = res.body;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: any;
  pageIndex: number=1;
  pageSize: number=2;
  totalPages: number;
  url: string = "/admin/product";
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      if(params.get('pageIndex')!=null){
        this.pageIndex = Number(params.get('pageIndex'));
        this.pageSize = Number(params.get('pageSize'));
      }
      this.getProducts();
    })
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe(res=>{
      console.log(res);
      this.router.navigateByUrl(`admin/product?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`);
      this.getProducts();
    });
  }

  getProducts(){
    this.productService.getProducts(this.pageIndex,this.pageSize).subscribe(res=>{
      this.totalPages = Number(res.headers.get('totalpages'));
      this.products = res.body;
    })
  }

}

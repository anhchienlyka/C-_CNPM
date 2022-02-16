import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-find-products-by-name',
  templateUrl: './find-products-by-name.component.html',
  styleUrls: ['./find-products-by-name.component.scss']
})
export class FindProductsByNameComponent implements OnInit {

  products: any;
  productName: string;z
  

  constructor(private productService: ProductService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.productName = params['name'];
      this.findProductsByName(this.productName);
    })
  }

  findProductsByName(name: string){
    this.productService.findProductsByName(name).subscribe(res=>{
      this.products = res.body;
    })
  }

}

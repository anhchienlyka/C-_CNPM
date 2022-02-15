import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() url: string;
  @Input() totalPages: number;
  @Input() pageIndex: number;
  pageSize: number = 2;
  pageRange: number[] = [];
  constructor(private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.generatePageNumberRange();
  }

  ngOnInit(): void {
  }

  generatePageNumberRange(){
    this.pageRange = [];
    var start = 1;
    var end = 4;
    if(this.pageIndex>3){
      start = this.pageIndex-2;
    }
    if(this.totalPages<end){
      end = this.totalPages;
    }else if(this.totalPages-this.pageIndex>2){
            end = this.pageIndex+2;
    }else{
      end = this.totalPages;
    }
    for(let i = start; i<=end;i++){
      this.pageRange.push(i);
    }
  }

  changePageSize(){
    this.router.navigate([this.url],{queryParams:{pageIndex:1, pageSize:this.pageSize}});
  }

}

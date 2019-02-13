import { Component, OnInit } from '@angular/core';
import { IProductList } from './product-list.interface';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})
export class ProductListComponent implements OnInit{
    productListTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    _listFilter: string = "";

    constructor(private productService: ProductService) {
        this._listFilter = "cart";
        this.filteredList = this.productList;
    }
    productList: IProductList[] = [];

    OnInit(): void {
        // this.productService.getProducts().subscribe(
        //         data => {this.productList = data;}
        //         );
    }
    get getListFilter(): string {
        return this._listFilter;
    }

    set setListFilter(value: string) {
        this._listFilter = value;
        this.filteredList = this.getListFilter ? this.performFilter(this.getListFilter) : this.productList;
    }

    filteredList: IProductList[];

    onNotify(message: string): void {
        console.log(message);
    }    

    toggleImg(): void  {
        this.showImage = !this.showImage;
    }    

    performFilter(filterBy: string): IProductList[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.productList.filter((product: IProductList) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }
    
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.productList = products;
                this.filteredList = this.productList;
            }
        )
    }
}
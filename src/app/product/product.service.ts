import { IProductList } from './product-list.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    getProduct(id: number): Observable<IProductList | undefined> {
        return this.getProducts().pipe(
            map(
                (product: IProductList[]) => product.find(p=>p.productId === id)
            )
         );
    }
    
    private productUrl = "../../assets/products.json";
    // private productUrl = "../../api/products/products.json";
    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<IProductList[]> {
        return this.http.get<IProductList[]>(this.productUrl).pipe(
            tap(data => console.log('All Data '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            //Client-Side network issue
            errorMessage = `An error occured ${err.error.message}`;
        }
        else {
            //Backend returned unsuccessfull response code
            errorMessage = `Server returned code: ${err.status}, error code: ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
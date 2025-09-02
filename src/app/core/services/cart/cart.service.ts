import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable} from 'rxjs';
import { api_url } from '../../custom_injections/api_url';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient:HttpClient ,@Inject(api_url) private urlPath:string) { }

  cartCount:WritableSignal<number> =signal(0);

  addProductToCart(id:string):Observable<any> {
    return this.httpClient.post(this.urlPath+'/cart',
      {
        "productId":id
      }
    )

  }

  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(this.urlPath+'/cart')
  }

  removeFromCart(id:string):Observable<any> {
    return this.httpClient.delete(this.urlPath+`/cart/${id}`)
  }

  updateProductQuanity(id:string,newCount:number):Observable<any>{
    return this.httpClient.put(this.urlPath+`/cart/${id}`,
      {
    "count": newCount
      }
  )
  }

  clearUserCart():Observable<any> {
    return this.httpClient.delete(this.urlPath+'/cart')
  }




}

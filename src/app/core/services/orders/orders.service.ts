import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient ,@Inject(api_url) private urlPath:string) { }

  checkoutPayment(id:string,data:object):Observable<any> {
    return this.httpClient.post(this.urlPath+`/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
            "shippingAddress":data
      })
  }

    allorders(userId:string):Observable<any> {
    return this.httpClient.get(this.urlPath+`/orders/user/${userId}`);
  }


}

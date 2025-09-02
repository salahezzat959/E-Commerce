import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private readonly httpClient:HttpClient , @Inject(api_url) private apiPath:string) { }

  getAllBrands():Observable<any> {
    return this.httpClient.get(this.apiPath+'/brands');
  }


}

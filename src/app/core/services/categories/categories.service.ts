import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient, @Inject(api_url) private urlPath:string ) { }
  getCategories():Observable<any> {
    return this.httpClient.get(this.urlPath + "/categories")
  }

  getSpecificCategory(id:string):Observable<any>{
    return this.httpClient.get(this.urlPath + `/categories/${id}`)
  }

}

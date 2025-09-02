import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { api_url } from '../../custom_injections/api_url';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private httpClient:HttpClient,@Inject(api_url) private urlPath:string) { }

  //* here you can use enviment to import static value like api

  userData:any=null;

  private router = inject(Router);


  sendRegisterForm(data:object):Observable<any> {
    return this.httpClient.post(this.urlPath + '/auth/signup',data)
  }

  sendLoginForm(data:object):Observable<any> {
    return this.httpClient.post(this.urlPath + '/auth/signin',data)
  }

  saveUserData(){
    if(localStorage.getItem('userToken')!== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log("userData",this.userData);
    }
  }

  logOut():void {
    localStorage.removeItem('userToken');
    this.userData =null;
    //* call API remove token (if exist) at the back-end
    this.router.navigate(['/login']);
  }

  setEmailVerify(data:object):Observable<any> {
    return this.httpClient.post(this.urlPath +'/auth/forgotPasswords',data);
  }

  setCodeVerify(data:object):Observable<any> {
    return this.httpClient.post(this.urlPath +'/auth/verifyResetCode',data);
  }

  setNewPassword(data:object):Observable<any> {
    return this.httpClient.put(this.urlPath +'/auth/resetPassword',data);
  }
}

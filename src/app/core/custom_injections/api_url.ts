import { InjectionToken } from "@angular/core";

//* this is called custom injection => here we're injecting  string value

export  const api_url= new InjectionToken<string>('api_url');

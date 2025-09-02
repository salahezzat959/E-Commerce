import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // logic req
  //* if you need to check the api  use ==>
  //^ if(req.url.includes('cart'))

  if(localStorage.getItem('userToken')) {

    if(req.url.includes('cart')||req.url.includes('orders')||req.url.includes('wishlist')) {
          req = req.clone({
        setHeaders: {
        token: localStorage.getItem('userToken')!
      }
    });
    }

  }
  return next(req); // logic res
};

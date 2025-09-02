import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


//* state: hold the path
//* route: hold all information about the current routing

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const id = inject(PLATFORM_ID);

  if(isPlatformBrowser(id)){
    if(localStorage.getItem('userToken')!==null){
    return true;
  }
    router.navigate(['/login']);
    return false
  }
  return false
};

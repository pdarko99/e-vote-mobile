import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { EServicesService } from 'src/app/services/e-services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private eservice: EServicesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLoggedIn();;
  }
 

  checkLoggedIn(): boolean{
    if(localStorage.getItem('token') ){
      //run through to check if the user truely exists in the database with the help of ger user 
      // function in the auth service
      return true
    }

    this.router.navigate(['/'])
    return false;
    
  }

 
  
}

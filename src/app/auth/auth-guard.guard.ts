import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router : Router)
  {}

  canActivate():boolean
  {
    var UserString = localStorage.getItem("USER");
    if(UserString!="" && UserString!=null)
    {
      var UserObject = JSON.parse(UserString);
      //console.log(UserObject);
      if((UserObject.token!="" && UserObject.token!=null) && (UserObject.UserName!="" && UserObject.UserName!=null))
      {
        return true;        
      }
      else 
      {
        localStorage.clear();
        this.router.navigate(["/login"]);
        return false;
      }
    }
    else
    {
      localStorage.clear();
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

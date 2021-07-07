import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './../core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  /*
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  */

  canActivate(
    routeract: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    /*
    return this.authService.isAuthenticated
      .pipe(
        tap(res => console.log(res))
        //map(s => s === true ? true : false)
      );*/

    //const isAuthenticated = this.authService.checkAuthenticated()

    /*
    if (this.authService.checkAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
    */

    return this.authService.isAuthenticated
      .pipe(
        tap(res => {
          console.log(res);
          if (!res)
            this.router.navigate(['/login']);
        })
      );
  }

}

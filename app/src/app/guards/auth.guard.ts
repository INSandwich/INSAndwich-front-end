import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var item = localStorage.getItem('currentUser');
        if (item) {
          if(route.params['username']) {
            if(route.params['username'] != JSON.parse(item).username) {
              this.router.navigate(['/unauthorized']);
              return false;
            }
          }
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}

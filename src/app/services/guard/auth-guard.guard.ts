import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private _apiService: ApiService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this._apiService.getLocalStorageToken() === null || this._apiService.getLocalStorageToken() === undefined) {
      console.log('Bloqueado por el ward');
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }

}

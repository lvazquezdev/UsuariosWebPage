import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //HttpHeaders
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from './../../../models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  authenticate(loginUser: LoginModel) {
    return this.http.post(`${environment.urlApi}/authenticate`, loginUser);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token') as string;;
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token') as string;
    if (!this.jwtHelper.isTokenExpired(token) || localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logOut() {
    try {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    } catch (err) {
      console.error(err);
    }
  }

}
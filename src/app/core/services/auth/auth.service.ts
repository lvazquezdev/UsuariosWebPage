import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //HttpHeaders
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from './../../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  */

  public isAuthenticated: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isAuthenticated = new BehaviorSubject<boolean>(false);
  }

  async checkAuthenticated() {
    return this.isAuthenticated;
  }

  authenticate(loginUser: LoginModel) {
    return this.http.post(`${environment.urlApi}/authenticate`, loginUser);
  }

  async logOut() {
    try {
      this.isAuthenticated.next(false);
      this.router.navigate(['/login']);
    } catch (err) {
      console.error(err);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

}
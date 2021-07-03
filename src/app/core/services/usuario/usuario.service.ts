import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { LoginModel } from './../../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);


  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  async checkAuthenticated() {
    return this.isAuthenticated;
  }

  login(loginUser: LoginModel) {
    return this.httpClient.post(`${environment.urlApi}/login/authenticate`, loginUser);
  }

  async logout() {
    try {
      this.isAuthenticated.next(false);
      this.router.navigate(['login']);
    } catch (err) {
      console.error(err);
    }
  }
}

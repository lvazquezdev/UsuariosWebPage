import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: any;
  constructor(
    private authService: AuthService
  ) {
    this.usuario = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }

  ngOnInit(): void {
  }


  logOut() {
    this.authService.logOut();
  }
}

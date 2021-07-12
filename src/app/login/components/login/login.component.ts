import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModel } from '../../../models/login.model';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any;
  public loginInvalid: boolean | any;
  //private formSubmitAttempt: boolean | any;
  //private returnUrl: string | any;

  //_login: LoginModel | any;
  //usuario: Usuario | undefined;

  autorization: any;

  constructor(
    private formBuilder: FormBuilder,
    //private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) { }

  //this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
  ngOnInit() {
    this.form = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    this.authService.logOut();
  }

  get f() { return this.form.controls; }

  login() {
    if (this.form.valid) {
      try {
        const usuario = this.form.value

        this.authService.authenticate(usuario)
          .subscribe((res: any) => {
            if (res != undefined) {
              console.log(res["Token"]);
              //localStorage.setItem('isLoggedIn', JSON.stringify(user));
              localStorage.setItem('token', res["Token"]);
              //this.authService.setLoggedIn(true);
              //this.getUsuario(usuario["Usuario"], res["Token"]);
              this.router.navigate(['home']);

              //this.autorization = res;
              //this.authService.isAuthenticated.next(true);
            }
          },
            error => {
              alert('Usuario o Contraseña Invalido!');
            });



        /*
    .subscribe((res: any) => {
        this.usuarioService.isAuthenticated.next(true);

        console.log('Usuario:', res["Usuario"]);
        console.log('ExpireTime:', res["ExpireTime"]);
        console.log('Token:', res["Token"]);

        this.router.navigate(['home']);

      });;
      */

      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }

  /*
  getUsuario(usuario: string, token: string) {
    this.usuarioService.getUser(usuario, token)
      .subscribe((user: any) => {
        //this.usuario = { ...user };
        localStorage.setItem('isLoggedIn', JSON.stringify(user));
        localStorage.setItem('token', token);

        this.router.navigate(['home']);
      },
        error => {
          alert('Error:' + error);

        });
  }
  */

}

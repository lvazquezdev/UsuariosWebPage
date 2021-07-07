import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModel } from '../../../models/login.model';
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

  usuario: LoginModel | any;

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
  }

  login() {
    if (this.form.valid) {
      try {
        const usuario = this.form.value

        this.authService.authenticate(usuario)
          .subscribe((res: any) => {
            if (res != undefined) {
              this.autorization = res;
              this.getUsuario(usuario["Usuario"], res["Token"]);
            }
            //this.authService.isAuthenticated.next(true);
            //this.router.navigate(['home']);
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

  getUsuario(usuario: string, token: string) {
    this.usuarioService.getUser(usuario, token)
      .subscribe(u => {
        console.log(u);
      },
        error => {
          alert('Error:' + error);

        });
  }

}

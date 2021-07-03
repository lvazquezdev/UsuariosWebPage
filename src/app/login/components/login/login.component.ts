import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginModel } from '../../../models/login.model';
import { UsuarioService } from '../../../core/services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup | any;
  public loginInvalid: boolean | any;
  private formSubmitAttempt: boolean | any;
  private returnUrl: string | any;

  usuario: LoginModel | any;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  async ngOnInit() {

    //this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    if (await this.usuarioService.checkAuthenticated()) {
      await this.router.navigate(['home']);
    }
  }

  async login() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        const _usuario = this.form.get('Usuario').value;
        const _password = this.form.get('Password').value;

        const usuario = this.form.value

        this.usuarioService.login(usuario)
          .subscribe((res: any) => {
            this.usuarioService.isAuthenticated.next(true);

            console.log('Usuario:', res["Usuario"]);
            console.log('ExpireTime:', res["ExpireTime"]);
            console.log('Token:', res["Token"]);

            this.router.navigate(['home']);

          });;

      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}

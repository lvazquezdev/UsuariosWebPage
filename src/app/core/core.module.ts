import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth/auth.service';
import { UsuarioService } from './services/usuario/usuario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    AuthService,
    UsuarioService
  ]
})
export class CoreModule { }

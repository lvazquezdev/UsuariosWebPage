import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    LoginRoutingModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }

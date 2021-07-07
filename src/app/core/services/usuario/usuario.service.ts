import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //HttpHeaders
import { environment } from '../../../../environments/environment';
import { Usuario } from './../../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(
    private http: HttpClient,
  ) {
  }

  getUser(usuario: string, token: string) {

    let headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )

    return this.http.get(`${environment.urlApi}/usuario/obtenerUsuario?usuario=${usuario}`, { headers: headers });
  }
}

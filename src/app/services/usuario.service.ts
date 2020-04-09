import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://reqres.in/api';
  }


  getUsers() {
    return this.http.get(`${ this.url }/users?page=1`)
    .pipe(
      map( resp => {
        return resp['data'];
      })
    );
  }

}

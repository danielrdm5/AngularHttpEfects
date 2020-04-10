import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario = new Usuario(1, '', '', '', '');
  loaded: boolean = false;
  constructor( private router: ActivatedRoute,
               private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe( ({user, loaded, error})  => {
        
        
        if( user!= null ) {
          console.log(user);
          this.loaded = loaded;
          this.usuario = user;
        }
    });

    this.router.params.subscribe( ({id}) => {

      this.store.dispatch( cargarUsuario( {id: id} ));

    });




  }

}

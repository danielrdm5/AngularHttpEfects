

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';

import { of } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
        ofType(usuarioActions.cargarUsuario),
        mergeMap(
            (action) => this.usuarioService.getUser( action.id )
                .pipe(
                    map( user => usuarioActions.cargarUsuarioSuccess( { usuario: user } ) ),
                    catchError( err => of(usuarioActions.cargarUsuarioError( { payload: err } )) )
                )
            )
        )
    );


}

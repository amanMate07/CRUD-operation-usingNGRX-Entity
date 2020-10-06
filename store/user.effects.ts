import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/authentication/user.model';

import * as UserActions from './user.action'


@Injectable()
export class UserEffects{

    constructor(private actions$:Actions,private http:HttpClient){}

    @Effect()
    getRequest = this.actions$.pipe(
      ofType(UserActions.GET_REQUEST), switchMap(() => {
        return this.http.get<any>('api/data')
          .pipe(map(data => {
              return new UserActions.GetUsers(data.response.data)
          }), catchError(error => {
            return of(new UserActions.Failed('Failed'));
          }));
      })
    )
  
    @Effect({ dispatch: false })
    failed = this.actions$.pipe(
      ofType(UserActions.FAILED),
      tap(() => {
        alert('Failed')
      })
    );

}
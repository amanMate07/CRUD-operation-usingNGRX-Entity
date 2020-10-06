import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export interface User{
    id:string,
    email:string,
    name:string,
    password:string,
    select:boolean
}

export const GET_REQUEST='[User] Get Request';
export const GET_USER='[User] Get User';
export const FAILED='[User] Failed'
export const ADD_USER='[User] Add User'
export const ADD_UPDATE_USER='[User] Add Update User'
export const UPDATE_MULTIPLE='[User] Update Multiple'
export const DELETE_USER='[User] Delete User'
export const DELETE_USERS='[User] Delete Users'
export const DELETE_ALL='[User] Delete All'

export class GetRequest implements Action{
    readonly type=GET_REQUEST;
}

export class GetUsers implements Action{
    readonly type=GET_USER;
    constructor(public payload:User[]){}
}

export class Failed implements Action{
readonly type=FAILED;
constructor(public payload:string){}
}

export class AddUser implements Action{
    readonly type=ADD_USER;
    constructor(public payload : User){}
}

export class AddUpdateUser implements Action{
    readonly type=ADD_UPDATE_USER;
    constructor(public payload : User){}
}
export class DeleteUser implements Action {
    readonly type = DELETE_USER
  
    constructor(public payload: string) {}
  }
  
  export class DeleteUsers implements Action {
    readonly type = DELETE_USERS
  
    constructor(public payload: string[]) {}
  }
export class UpdateMultiple implements Action{
    readonly type=UPDATE_MULTIPLE;
    constructor(public payload :Update<User>[]){}
}

export class DeleteAll implements Action{
    readonly type=DELETE_ALL;
}
export type Actions= GetRequest | GetUsers | Failed | AddUser | AddUpdateUser | UpdateMultiple | DeleteUser|DeleteUsers | DeleteAll;
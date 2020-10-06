import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { User } from './user.action';
import * as UserActions from './user.action'
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState extends EntityState<User>
{
    selectUserId:string|null;
}

const userAdapter=createEntityAdapter<User>({
    selectId:(user:User)=>user.id
})

const initialState : UserState=userAdapter.getInitialState({
    selectUserId:null
})

export function userReducer(state=initialState,action:UserActions.Actions)
{
    switch(action.type)
    {
        case UserActions.GET_REQUEST:
            return state;
        case UserActions.GET_USER:
            return userAdapter.setAll(action.payload,state);
        case UserActions.ADD_USER:
            return userAdapter.addOne(action.payload,state);
        case UserActions.ADD_UPDATE_USER:
            return userAdapter.upsertOne(action.payload,state)
        case UserActions.UPDATE_MULTIPLE:
            return userAdapter.updateMany(action.payload,state);
        case UserActions.DELETE_USER:
            return userAdapter.removeOne(action.payload,state);
        case UserActions.DELETE_USERS:
            return userAdapter.removeMany(action.payload,state);
        case UserActions.DELETE_ALL:
            return userAdapter.removeAll(state);
        default:
            return state;
    }
}

export const selectedUserState = createFeatureSelector<UserState>('userReducer');

export const { selectAll:selectAllUsers,selectIds}=userAdapter.getSelectors(selectedUserState);

export const selectUserbyId=createSelector(
    selectedUserState,(state=>{
        return state.entities[state.selectUserId];
    })
)
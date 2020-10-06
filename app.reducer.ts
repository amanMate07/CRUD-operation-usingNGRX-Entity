import { ActionReducerMap } from '@ngrx/store'
import * as fromAuth from '../authentication/login/store/auth.reducer'
import * as fromHello from '../hello/store/hello.reducer'
import * as fromCourses from '../courses/store/courses.reducer'
import * as fromHero from '../hero/store/hero-reducer'
import * as fromUser from '../user/store/user.reducer'
export interface AppState{
    authReducer:fromAuth.State;
    helloReducer:fromHello.State;
    coursesReducer:fromCourses.HeroState;
    heroReducer:fromHero.HeroState;
    userReducer:fromUser.UserState;

}

export const appReducer:ActionReducerMap<AppState>={
   authReducer:fromAuth.authReducer,
   helloReducer:fromHello.helloReducer,
   coursesReducer:fromCourses.heroReducer,
   heroReducer:fromHero.heroReducer,
   userReducer:fromUser.userReducer
};
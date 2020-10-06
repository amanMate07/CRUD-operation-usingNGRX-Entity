import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './authentication/token-interceptor.service';
import { LoaderComponent } from './loader/loader.component';
import { AuthGuard } from './authentication/auth.guard';
import { SignedInGuard } from './authentication/signed-in.guard';

import * as fromApp from '../app/store/app.reducer'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './authentication/login/store/auth.effects';
import { HelloEffect } from './hello/store/hello.effects';
import { CoursesComponent } from './courses/courses.component';
import { CoursesEffect } from './courses/store/courses.effects';
import { HeroComponent } from './hero/hero.component';
import { HeroEffects } from './hero/store/hero-effects';
import { UserComponent } from './user/user.component';
import { UserEffects } from './user/store/user.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoaderComponent,
    CoursesComponent,
    HeroComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,FormsModule,ReactiveFormsModule,
    AppRoutingModule,HttpClientModule,StoreModule.forRoot(fromApp.appReducer),EffectsModule.forRoot([AuthEffects,HelloEffect,CoursesEffect,HeroEffects,UserEffects])
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},AuthGuard,SignedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

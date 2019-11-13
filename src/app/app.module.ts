import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LeadDialerComponent } from './lead-dialer/lead-dialer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgxMaskModule, IConfig} from 'ngx-mask';
import { LogoutComponent } from './logout/logout.component';

export var optionsmask: Partial<IConfig> | (() => Partial<IConfig>);


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    LeadDialerComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(optionsmask)
  ],
  providers: [UserService,AuthGuard,
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

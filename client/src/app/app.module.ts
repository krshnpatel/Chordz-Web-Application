import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { router } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from './auth.service.ts';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { EditChordsComponent } from './edit-chords/edit-chords.component';
import { ErrorsComponent } from './errors/errors.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    ProfileComponent,
    DisclaimerComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    EditChordsComponent,
    ErrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router
  ],
  providers: [
    AUTH_PROVIDERS,
    Auth
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

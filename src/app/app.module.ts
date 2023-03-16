import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatButtonModule} from "@angular/material/button";
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageExploreSpotsComponent } from './home-page/home-page-explore-spots/home-page-explore-spots.component';
import { HomePageInfoComponent } from './home-page/home-page-info/home-page-info.component';
import { HomePageHeaderComponent } from './home-page/home-page-header/home-page-header.component';
import { HomePageExploreUserComponent } from './home-page/home-page-explore-user/home-page-explore-user.component';
import { RegisterComponent } from './login/register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InputValidatorComponent} from "./input-field/input-validator.component";
import { LoginComponent } from './login/login/login.component';
import { PopupInfoComponent } from './popup-info/popup-info.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomePageExploreSpotsComponent,
    HomePageInfoComponent,
    HomePageHeaderComponent,
    HomePageExploreUserComponent,
    RegisterComponent,
    InputValidatorComponent,
    LoginComponent,
    PopupInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

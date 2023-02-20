import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import { SpotComponent } from './spots/spot/spot.component';
import { SpotListComponent } from './spots/spot-list/spot-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "map", component: MapComponent},
  {path: "login", component: LoginComponent},
  {path: "user/:username", component: UserProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
      UserProfileComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    SpotComponent,
    SpotListComponent
  ],
  imports: [
    MatInputModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [
      RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

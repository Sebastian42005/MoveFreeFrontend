import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {HomePageComponent} from './home-page/home-page.component';
import {HomePageExploreSpotsComponent} from './home-page/home-page-explore-spots/home-page-explore-spots.component';
import {HomePageInfoComponent} from './home-page/home-page-info/home-page-info.component';
import {HomePageHeaderComponent} from './home-page/home-page-header/home-page-header.component';
import {HomePageExploreUserComponent} from './home-page/home-page-explore-user/home-page-explore-user.component';
import {RegisterComponent} from './login/register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InputValidatorComponent} from "./input-field/input-validator.component";
import {LoginComponent} from './login/login/login.component';
import {PopupInfoComponent} from './popup-info/popup-info.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridListModule} from "@angular/material/grid-list";
import {ExploreSpotsComponent} from './explore-spots/explore-spots.component';
import {RouterModule, Routes} from "@angular/router";
import {listAnimation} from "./animations";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { ExploreSpotsHeaderComponent } from './explore-spots/explore-spots-header/explore-spots-header.component';
import { ExploreSpotsFilterComponent } from './explore-spots/explore-spots-filter/explore-spots-filter.component';
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'explore', component: ExploreSpotsComponent},
];

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
        ExploreSpotsComponent,
        ExploreSpotsHeaderComponent,
        ExploreSpotsFilterComponent,
    ],
    imports: [
        MatButtonToggleModule,
        HttpClientModule,
        BrowserModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatIconModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

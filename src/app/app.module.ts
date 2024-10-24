import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {HomePageComponent} from './views/home-page/home-page.component';
import {
  HomePageExploreSpotsComponent
} from './views/home-page/home-page-explore-spots/home-page-explore-spots.component';
import {HomePageInfoComponent} from './views/home-page/home-page-info/home-page-info.component';
import {HomePageHeaderComponent} from './views/home-page/home-page-header/home-page-header.component';
import {HomePageExploreUserComponent} from './views/home-page/home-page-explore-user/home-page-explore-user.component';
import {RegisterComponent} from './components/login/register/register.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {InputValidatorComponent} from "./components/input-field/input-validator.component";
import {GALLERY_CONFIG, GalleryModule} from 'ng-gallery';
import {LoginComponent} from './components/login/login/login.component';
import {PopupInfoComponent} from './components/popup-info/popup-info.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridListModule} from "@angular/material/grid-list";
import {ExploreSpotsComponent} from './views/explore-spots/explore-spots.component';
import {RouterModule, Routes} from "@angular/router";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ExploreSpotsHeaderComponent} from './views/explore-spots/explore-spots-header/explore-spots-header.component';
import {ExploreSpotsFilterComponent} from './views/explore-spots/explore-spots-filter/explore-spots-filter.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ProfilePictureComponent} from './components/profile-picture/profile-picture.component';
import {ProfileSelecterComponent} from './views/profile/profile-selecter/profile-selecter.component';
import {UserProfileComponent} from "./views/profile/user-profile/user-profile.component";
import {OwnProfileComponent} from "./views/profile/own-profile/own-profile.component";
import {ButtonComponent} from './components/button/button.component';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoadingComponent} from './components/loading/loading.component';
import {InfosComponent} from './components/infos/infos.component';
import {UserSpotListComponent} from './components/user-spot-list/user-spot-list.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {UploadSpotComponent} from './components/upload-spot/upload-spot.component';
import {MatSelectModule} from "@angular/material/select";
import {SelectComponent} from './components/select/select.component';
import {AdminComponent} from './views/admin/admin.component';
import {SpotComponent} from './views/spot/spot.component';
import {SubMenuComponent} from './components/sub-menu/sub-menu.component';
import {SubMenuItemComponent} from './components/sub-menu/sub-menu-item/sub-menu-item.component';
import {SingleSelectComponent} from './components/single-select/single-select.component';
import {SearchComponent} from './components/search/search.component';
import {SpotProfileComponent} from './views/spot/spot-profile/spot-profile.component';
import {SpotRatingComponent} from './views/spot/spot-rating/spot-rating.component';
import {SpotTypeListComponent} from './components/spot-type-list/spot-type-list.component';
import {StarsComponent} from './components/stars/stars.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {RateSpotComponent} from './views/spot/spot-rating/rate-spot/rate-spot.component';
import {StarPickerComponent} from './components/star-picker/star-picker.component';
import {SpotOptionsComponent} from './views/spot/spot-profile/spot-options/spot-options.component';
import {AdminUserComponent} from './views/admin/user/admin-user/admin-user.component';
import {AdminCreateUserComponent} from './views/admin/user/admin-create-user/admin-create-user.component';
import {AdminDetailUserComponent} from './views/admin/user/admin-detail-user/admin-detail-user.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'explore', component: ExploreSpotsComponent},
  {path: 'user/:username', component: ProfileSelecterComponent},
  {path: 'spot/:id', component: SpotComponent},
  {path: 'admin', component: AdminComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent},
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
    ProfilePictureComponent,
    ProfileSelecterComponent,
    UserProfileComponent,
    OwnProfileComponent,
    ButtonComponent,
    NotFoundComponent,
    NotFoundComponent,
    LoadingComponent,
    InfosComponent,
    UserSpotListComponent,
    UploadSpotComponent,
    SelectComponent,
    AdminComponent,
    SpotComponent,
    SubMenuComponent,
    SubMenuItemComponent,
    SingleSelectComponent,
    SearchComponent,
    SpotProfileComponent,
    SpotRatingComponent,
    SpotTypeListComponent,
    StarsComponent,
    UserListComponent,
    RateSpotComponent,
    StarPickerComponent,
    SpotOptionsComponent,
    AdminUserComponent,
    AdminCreateUserComponent,
    AdminDetailUserComponent,
  ],
  imports: [
    MatButtonToggleModule,
    HttpClientModule,
    BrowserModule,
    GalleryModule,
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
    RouterModule.forRoot(routes),
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

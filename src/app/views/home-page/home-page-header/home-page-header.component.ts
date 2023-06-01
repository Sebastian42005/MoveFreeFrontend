import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../components/login/register/register.component";
import {ApiService, getUserProfileImage} from "../../../api/api.service";
import {LoginComponent, loginEmitter} from "../../../components/login/login/login.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupInfoComponent, PopupInfoData} from "../../../components/popup-info/popup-info.component";
import {Router} from "@angular/router";
import {Role} from "../../../api/dataclasses/Role";
import {LocalStorageManager} from "../../../helper/LocalStorageManager";
import {logoutEmitter} from "../../../components/sub-menu/sub-menu.component";

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
  isLoggedIn = LocalStorageManager.isLoggedIn();
  username = ""
  showSubMenu = false

  constructor(private matDialog: MatDialog,
              private apiService: ApiService,
              private snackBar: MatSnackBar,
              private router: Router,
              private elementRef: ElementRef) {
  }

  openRegisterDialog() {
    this.matDialog.open(RegisterComponent);
  }

  openLoginDialog() {
    this.matDialog.open(LoginComponent);
  }

  ngOnInit(): void {
    this.checkForLogin();
    loginEmitter.subscribe(userRole => {
      this.setLoggedIn(userRole.username)
      if (userRole.role === Role.ADMIN) {
        this.router.navigate(["admin"]).then(() => {
        })
      }
    })
    logoutEmitter.subscribe(() => {
      this.isLoggedIn = false;
    })
  }

  checkForLogin() {
    let token = LocalStorageManager.getToken();
    if (token != null && token.length > 0) {
      this.apiService.getOwnName().subscribe(response => {
        this.setLoggedIn(response.username);
      }, () => {
        LocalStorageManager.removeTokenAndUsername();
        this.isLoggedIn = false;
      });
    }
  }

  setLoggedIn(username: string) {
    this.isLoggedIn = true
    this.username = username
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSubMenu = false;
    }
  }
}

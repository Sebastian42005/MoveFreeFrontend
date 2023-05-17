import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageManager} from "../../../helper/LocalStorageManager";
import {ApiService} from "../../../api/api.service";
import {RegisterComponent} from "../../../components/login/register/register.component";
import {LoginComponent, loginEmitter} from "../../../components/login/login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {Role} from "../../../api/dataclasses/Role";
import {logoutEmitter} from "../../home-page/home-page-sub-menu/home-page-sub-menu.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-explore-spots-header',
  templateUrl: './explore-spots-header.component.html',
  styleUrls: ['./explore-spots-header.component.scss']
})
export class ExploreSpotsHeaderComponent implements OnInit{
  @Input() isLoading = true;
  isLoggedIn = false
  username = ""

  constructor(private apiService: ApiService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  openRegisterDialog() {
    this.matDialog.open(RegisterComponent);
  }

  openLoginDialog() {
    this.matDialog.open(LoginComponent);
  }

  ngOnInit(): void {
    this.checkForLogin();
    this.checkForLogout();
  }

  checkForLogin() {
    let token = LocalStorageManager.getToken();
    if (token != null && token.length > 0) {
      this.apiService.getOwnProfile().subscribe(response => {
        this.setLoggedIn(response.username);
      }, () => {
        LocalStorageManager.removeTokenAndUsername();
        this.isLoggedIn = false;
      });
    }
    loginEmitter.subscribe(userRole => {
      this.setLoggedIn(userRole.username)
      if (userRole.role === Role.ADMIN) {
        this.router.navigate(["admin"]).then(() => {
        })
      }
    })
  }

  checkForLogout() {
    logoutEmitter.subscribe(() => {
      this.isLoggedIn = false;
    })
  }

  setLoggedIn(username: string) {
    this.isLoggedIn = true
    this.username = username
  }
}

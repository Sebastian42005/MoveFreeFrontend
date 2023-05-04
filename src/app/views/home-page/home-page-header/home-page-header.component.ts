import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../../components/login/register/register.component";
import {ApiService} from "../../../api/api.service";
import {LoginComponent, loginEmitter} from "../../../components/login/login/login.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupInfoComponent, PopupInfoData} from "../../../components/popup-info/popup-info.component";

@Component({
    selector: 'app-home-page-header',
    templateUrl: './home-page-header.component.html',
    styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
    isLoggedIn = localStorage.getItem("token") != null;
    profileImage = "";
    username = ""
    isImageLoaded = false;

    constructor(private matDialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar) {
    }

    openRegisterDialog() {
        this.matDialog.open(RegisterComponent);
    }

    openLoginDialog() {
        this.matDialog.open(LoginComponent);
    }

    ngOnInit(): void {
        this.checkForLogin();
        loginEmitter.subscribe(username => {
            this.setLoggedIn(username)
        })
    }

    openSnackBar(message: string, error: boolean) {
        this.snackBar.openFromComponent(PopupInfoComponent, {
            duration: 5000,
            verticalPosition: "top",
            horizontalPosition: "center",
            data: new PopupInfoData(message, error),
            panelClass: [error ? 'error' : 'success']
        });
    }

    checkForLogin() {
        let token = localStorage.getItem("token")
        if (token != null && token.length > 0) {
            this.apiService.getOwnProfile().subscribe(response => {
                this.setLoggedIn(response.username)
            }, () => {
                this.isLoggedIn = false
            });
        }
    }

    setLoggedIn(username: string) {
        this.isLoggedIn = true
        this.username = username
        this.profileImage = "http://localhost:8080/api/user/" + username + "/profile";
    }
}

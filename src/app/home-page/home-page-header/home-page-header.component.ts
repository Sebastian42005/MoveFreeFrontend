import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../../login/register/register.component";
import {ApiService} from "../../api/api.service";
import {LoginComponent} from "../../login/login/login.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupInfoComponent, PopupInfoData} from "../../popup-info/popup-info.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-home-page-header',
    templateUrl: './home-page-header.component.html',
    styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {
    isLoggedIn = localStorage.getItem("token") != null;
    profileImage = "";
    isImageLoaded = false;

    constructor(private matDialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar) {
    }

    openRegisterDialog() {
        let registerDialog = this.matDialog.open(RegisterComponent);
        registerDialog.afterClosed().subscribe(result => {
            if (result) {
                this.apiService.register(result.username, result.email, result.password).subscribe(() => {
                    this.openSnackBar("Register complete", false)
                    this.openLoginDialog()
                }, (error: HttpErrorResponse) => {
                    if (error.status == 409) {
                        this.openSnackBar("User already exists", true)
                    } else {
                        this.openSnackBar("Login failed", true)
                    }
                })
            }
        });
    }

    openLoginDialog() {
        this.matDialog.open(LoginComponent);
    }

    ngOnInit(): void {
        this.checkForLogin();
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
                this.isLoggedIn = true
                this.profileImage = "http://localhost:8080/api/user/" + response.username + "/profile";
            }, () => {
                this.isLoggedIn = false
            });
        }
    }
}

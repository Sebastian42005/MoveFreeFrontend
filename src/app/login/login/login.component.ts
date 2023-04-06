import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../api/api.service";
import {PopupInfoComponent, PopupInfoData} from "../../popup-info/popup-info.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ThisReceiver} from "@angular/compiler";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = ""
  password = ""
  constructor(private matDialogRef: MatDialogRef<LoginComponent>, private apiService: ApiService, private snackBar: MatSnackBar, private matDialog: MatDialog) {}

  close() {
    this.apiService.login(this.username, this.password).subscribe(response => {
      this.openSnackBar("Login complete", false)
      localStorage.setItem("token", response.token)
      this.matDialogRef.close({
        "username": this.username,
        "password": this.password
      })
    }, (error: HttpErrorResponse) => {
      if (error.status == 401) {
        this.openSnackBar("Wrong Login Credentials", true)
      }
    })
  }

  openSnackBar(message: string, error: boolean) {
    this.snackBar.openFromComponent(PopupInfoComponent, {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "center",
      data: new PopupInfoData(message, error),
      panelClass: [error ? 'error': 'success']
    });
  }

  openRegisterDialog() {
    this.matDialogRef.close()
    let registerDialog = this.matDialog.open(RegisterComponent);
    registerDialog.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.register(result.username, result.email, result.password).subscribe(_ => {
          this.openSnackBar("Register complete", false)
          //this.openLoginDialog()
        }, (error: HttpErrorResponse) => {
          if (error.status == 409) {
            this.openSnackBar("User already exists", true)
          }else {
            this.openSnackBar("Login failed", true)
          }
        })
      }
    });
  }
}

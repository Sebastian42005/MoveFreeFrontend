import {Component, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../api/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterComponent} from "../register/register.component";
import {showMessageEmitter} from "../../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = ""
  password = ""
  canLogin = false
  constructor(private matDialogRef: MatDialogRef<LoginComponent>, private apiService: ApiService, private snackBar: MatSnackBar, private matDialog: MatDialog) {}

  close() {
    this.apiService.login(this.username, this.password).subscribe(response => {
      localStorage.setItem("token", response.token)
      localStorage.setItem("username", this.username)
      this.matDialogRef.close()
      showMessageEmitter.emit({
        "message": "Login complete",
        "error": false
      })
      loginEmitter.emit(this.username)
    }, (error: HttpErrorResponse) => {
      if (error.status == 401) {
        showMessageEmitter.emit({
          "message": "Wrong Login Credentials",
          "error": true
        })
      }
    })
  }

  openRegisterDialog() {
    this.matDialogRef.close()
    this.matDialog.open(RegisterComponent);
  }

  checkForLoginUsername(username: any) {
    this.username = username
    this.setCanLogin()
  }

  checkForLoginPassword(password: any) {
    this.password = password
    this.setCanLogin()
  }

  setCanLogin() {
    this.canLogin =  this.username.length > 0 && this.password.length > 7
  }
}

export const loginEmitter = new EventEmitter<string>();

import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../../api/api.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginComponent} from "../login/login.component";
import {showMessageEmitter} from "../../../app.component";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    username = ""
    email = ""
    password = ""
    canRegister = false

    constructor(private matDialogRef: MatDialogRef<RegisterComponent>,
                private apiService: ApiService,
                private matDialog: MatDialog) {}

    close() {
        this.apiService.register(this.username, this.email, this.password).subscribe(_ => {
            showMessageEmitter.emit({
                "message": "Register complete",
                "error": false
            })
            this.matDialog.open(LoginComponent)
            this.matDialogRef.close({
                "username": this.username,
                "email": this.email,
                "password": this.password
            })
        }, (error: HttpErrorResponse) => {
            if (error.status == 409) {
                showMessageEmitter.emit({
                    "message": "User already exists",
                    "error": true
                })
            } else if (error.status == 400) {
                showMessageEmitter.emit({
                    "message": "Invalid email",
                    "error": true
                })
            } else {
                showMessageEmitter.emit({
                    "message": "Login failed",
                    "error": true
                })
            }
        })
    }

    openLoginDialog() {
        this.matDialogRef.close()
        this.matDialog.open(LoginComponent);
    }

    canRegisterUsername(username: any) {
        this.username = username
        this.setCanRegister()
    }

    canRegisterEmail(email: any) {
        this.email = email
        this.setCanRegister()
    }

    canRegisterPassword(password: any) {
        this.password = password
        this.setCanRegister()
    }

    private setCanRegister() {
        this.canRegister = this.username.length > 0 && this.email.length > 0 && this.password.length > 7
    }
}

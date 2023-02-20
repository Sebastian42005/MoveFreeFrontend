import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api/api.service";
import {Browser} from "leaflet";
import win = Browser.win;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ""
  username = ""
  password = ""
  emailColor = "input"
  usernameColor = "input"
  passwordColor = "input"
  showPassword = false
  passwordIcon = "show"
  passwordType = "password"
  isLogin = true

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  togglePassword() {
    this.showPassword = !this.showPassword
    this.passwordIcon = this.showPassword ? "hide" : "show"
    this.passwordType = this.showPassword ? "text" : "password"
  }

  signUp() {
    if (this.isLogin) {
      this.apiService.login(this.username, this.password).subscribe(token => {
        localStorage.setItem("username", this.username)
        localStorage.setItem("token", token.token)
        window.location.href = "/user/" + this.username
      })
    }else {
      this.apiService.register(this.username, this.email, this.password).subscribe(user => {
        this.isLogin = true
      })
    }
  }

  changeEmailStyle(isFocus : boolean) {
    this.emailColor = isFocus ? "input-focus" : "input"
  }

  changeUsernameStyle(isFocus : boolean) {
    this.usernameColor = isFocus ? "input-focus" : "input"
  }

  changePasswordStyle(isFocus : boolean) {
    this.passwordColor = isFocus ? "input-focus" : "input"
  }
}

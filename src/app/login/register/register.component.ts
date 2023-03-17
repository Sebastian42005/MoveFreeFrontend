import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = ""
  email = ""
  password = ""
  constructor(private matDialogRef: MatDialogRef<RegisterComponent>) {}

  close() {
    this.matDialogRef.close({
      "username": this.username,
      "email": this.email,
      "password": this.password
    })
  }
}

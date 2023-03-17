import {Component, Inject, inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-popup-info',
  templateUrl: './popup-info.component.html',
  styleUrls: ['./popup-info.component.scss'],
})
export class PopupInfoComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: PopupInfoData) {
  }

  getIconClass() {
    return this.data.error ? "icon error" : "icon success"
  }
}

export class PopupInfoData {
  message: string
  error: boolean

  constructor(message: string, error: boolean) {
    this.message = message;
    this.error = error;
  }
}

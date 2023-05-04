import {Component, EventEmitter, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupInfoComponent, PopupInfoData} from "./components/popup-info/popup-info.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'MoveFreeFrontend';

    constructor(private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        showMessageEmitter.subscribe((messageData: MessageData) => {
            this.openSnackBar(messageData.message, messageData.error);
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
}

export const showMessageEmitter = new EventEmitter<MessageData>();

export interface MessageData {
    message: string;
    error: boolean;
}

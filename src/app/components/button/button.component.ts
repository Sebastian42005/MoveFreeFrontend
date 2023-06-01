import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit{
    @Input() text = "Button";
    @Input() type = ButtonType.LEFT_TO_RIGHT;
    @Input() disabled = false;
    @Input() primaryColor = "#002349"
    @Input() primaryColor2 = "#011b38"
    @Input() backgroundColor = "#ffffff"


    constructor(private element: ElementRef) {

    }

    ngOnInit(): void {
        this.element.nativeElement.style.setProperty('--primary-color', this.primaryColor);
        this.element.nativeElement.style.setProperty('--primary-color2', this.primaryColor2);
        this.element.nativeElement.style.setProperty('--background-color', this.backgroundColor);
    }
}

export enum ButtonType {
    LEFT_TO_RIGHT,
    ANIMATION
}

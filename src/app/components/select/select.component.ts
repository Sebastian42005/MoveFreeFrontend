import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent {
    @Input() options: string[] = [];
    @Input() placeholder = '';
    @Output() selectedOptionChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() selectedOptions: string[] = [];
    isOpen = false;

    constructor(private elementRef: ElementRef) {}


    onSelectOption(option: string) {
        if (!this.selectedOptions.includes(option)) {
            this.selectedOptions.push(option);
        } else {
            this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption !== option);
        }
        this.selectedOptionChange.emit(option);
    }

    getSpotTypeImage(name: string) {
        return `http://localhost:8080/api/spot/type/${name}`
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}

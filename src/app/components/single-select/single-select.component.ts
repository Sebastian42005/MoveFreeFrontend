import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss']
})
export class SingleSelectComponent {
  @Input() placeholder = '';
  @Input() options = [
    {
      "image": "",
      "text": ""
    }
  ]
  @Output() selectedOptionChange = new EventEmitter<string>();
  selectedOption = "";
  isOpen = false;

  constructor(private elementRef: ElementRef) {
  }


  onSelectOption(option: string) {
    this.isOpen = false;
    if (this.selectedOption === option) {
      this.selectedOption = ""
    } else {
      this.selectedOption = option
    }
    this.selectedOptionChange.emit(this.selectedOption);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}

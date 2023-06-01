import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-validator',
  templateUrl: 'input-validator.component.html',
  styleUrls: ['./input-validator.component.scss']
})
export class InputValidatorComponent {

  @Input() type: string = 'text';
  @Input() maxCharLength: number = 255;
  @Input() hasMaxCharLength: boolean = true;
  @Input() autocomplete: string = '';
  @Input() isTextArea: boolean = false;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() text: any;
  @Output() textChange: EventEmitter<any> = new EventEmitter<any>();

  getTextLength() {
    return String(this.text).length
  }

  changeText(textNew: any) {
    this.text = textNew;

    this.textChange.emit(textNew);
  }
}

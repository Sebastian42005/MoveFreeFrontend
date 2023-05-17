import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sub-menu-item',
  templateUrl: './sub-menu-item.component.html',
  styleUrls: ['./sub-menu-item.component.scss']
})
export class SubMenuItemComponent {
  @Input() icon = ""
  @Input() text = ""
}

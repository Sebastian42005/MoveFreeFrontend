import {Component, EventEmitter, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LocalStorageManager} from "../../../helper/LocalStorageManager";
import {showMessageEmitter} from "../../../app.component";

@Component({
  selector: 'app-home-page-sub-menu',
  templateUrl: './home-page-sub-menu.component.html',
  styleUrls: ['./home-page-sub-menu.component.scss'],
  animations: [
    trigger('changeHeightAnimation', [
      state('close', style({
        height: '0',
      })),
      state('open', style({
        height: '30vh',
      })),
      transition('open => close', [
        animate('200ms')
      ]),
      transition('close => open', [
        animate('200ms')
      ]),
    ])
  ]
})
export class HomePageSubMenuComponent {
  @Input() showSubMenu = false;
  @Input() username: string | null = null;

  logout() {
    LocalStorageManager.removeTokenAndUsername();
    showMessageEmitter.emit({
      message: "Logged out successfully",
      error: false
    })
    logoutEmitter.emit();
  }
}

export const logoutEmitter = new EventEmitter();

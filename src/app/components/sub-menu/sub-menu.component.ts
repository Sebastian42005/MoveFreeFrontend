import {Component, EventEmitter, Input} from '@angular/core';
import {changeHeightAnimation} from "../../animations/animations";
import {iterator} from "rxjs/internal/symbol/iterator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  animations: [changeHeightAnimation]
})
export class SubMenuComponent {
  @Input() showSubMenu = false;
  @Input() username: string = "";
  @Input() hasProfile = false;
  @Input() top = "10vh";
  @Input() right = "50px";
  @Input() menuItems: { name: string, icon: string, color: string | undefined, arrow: boolean, click: EventEmitter<any> | undefined}[] = [];

  constructor(private router: Router) {
  }


  protected readonly iterator = iterator;

  navigateToUser() {
    if (this.username) {
      this.router.navigate(['user', this.username]);
    }
  }
}

export const logoutEmitter = new EventEmitter();

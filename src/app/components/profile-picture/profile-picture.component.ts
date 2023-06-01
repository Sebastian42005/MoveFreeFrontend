import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit} from '@angular/core';
import {getUserProfileImage} from "../../api/api.service";
import {LocalStorageManager} from "../../helper/LocalStorageManager";
import {showMessageEmitter} from "../../app.component";
import {logoutEmitter} from "../sub-menu/sub-menu.component";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  isImageLoaded = false;
  @Input() size = "70px";
  @Input() borderSize = "3px";
  @Input() isLoggedIn = false;
  @Input() username: string | null = null;
  @Input() profilePath = "";
  profileImage = "assets/images/profile.png";
  showSubMenu = false;
  logoutEventEmitter = new EventEmitter();
  menuOptionIcons: { name: string, icon: string, color: string | undefined, arrow: boolean, click: EventEmitter<any> | undefined}[] = [
    {name: "Settings", icon: "settings", color: undefined, arrow: true, click: undefined},
    {name: "Support", icon: "help", color: undefined, arrow: true, click: undefined},
    {name: "Logout", icon: "exit_to_app", color: undefined, arrow: true, click: this.logoutEventEmitter},
  ]

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.username) {
      this.profileImage = getUserProfileImage(this.username);
    }
    this.logoutEventEmitter.subscribe(() => {
      this.logout();
    });
  }

  logout() {
    LocalStorageManager.removeTokenAndUsername();
    showMessageEmitter.emit({
      message: "Logged out successfully",
      error: false
    })
    logoutEmitter.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSubMenu = false;
    }
  }

  showUserSubMenu() {
    if (this.isLoggedIn) {
      this.showSubMenu = !this.showSubMenu;
    }
  }
}

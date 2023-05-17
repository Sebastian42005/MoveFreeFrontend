import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {getUserProfileImage} from "../../api/api.service";

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
  profileImage = "assets/images/profile.png";
  showSubMenu = false;


  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.username) {
      this.profileImage = getUserProfileImage(this.username);
    }
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

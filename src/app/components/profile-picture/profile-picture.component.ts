import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent {
  @Input() profileImage = "assets/images/profile.png";
  isImageLoaded = false;
  @Input() size = "70px";
  @Input() borderSize = "3px";
}

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent {
  @Input() infos= [
    {title: "Follower", value: "", image: "assets/images/follower.png"}
  ]
}

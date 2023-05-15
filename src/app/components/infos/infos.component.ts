import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent {
  @Input() infos= [
    {title: "Follower", value: "200", image: "assets/images/follower.png"},
    {title: "Follows", value: "250", image: "assets/images/follows.png"}
  ]
}

import {Component, Input, OnInit} from '@angular/core';
import {Spot} from "../../api/dataclasses/Spot";

@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.css']
})
export class SpotListComponent implements OnInit {

  @Input() spots: Spot[]

  constructor() { }

  ngOnInit(): void {
  }

}

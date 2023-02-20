import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Spot} from "../api/dataclasses/Spot";
import {SpotType} from "../api/enums/spot-type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profilePic? = localStorage.getItem("username") ? `http://localhost:8080/api/user/${localStorage.getItem("username")}/profile` : null
  showMobileNavigation = false
  spots: Spot[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllSpots([SpotType.PARKOUR, SpotType.FREERUNNING], []).subscribe(spots => {
      this.spots = spots
    })
  }
}

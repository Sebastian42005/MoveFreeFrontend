import {Component, Input, OnInit} from '@angular/core';
import {ApiService, getSpotImage} from "../../api/api.service";
import {Spot} from "../../api/dataclasses/Spot";
import {isUploadFinishedEventEmitter} from "../upload-spot/upload-spot.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-spot-list',
  templateUrl: './user-spot-list.component.html',
  styleUrls: ['./user-spot-list.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({transform: 'translateX(0)'})),
      transition('* => *', [
        style({transform: 'translateX(-100%)'}),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class UserSpotListComponent implements OnInit {
  showLoadNewSpots = false;
  @Input() username = "";
  @Input() savedSpots = false;
  spots: Spot[] = [];
  spotsSaved: Spot[] = [];
  SPOT_LIMIT = 6;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getUserSpots();
    this.isUploadFinished();
  }

  isUploadFinished() {
    isUploadFinishedEventEmitter.subscribe(spot => {
      this.spots.push(spot);
    });
  }

  getUserSpots() {
    this.showLoadNewSpots = false;
    if (this.savedSpots) {
      this.apiService.getSavedSpots( [], this.SPOT_LIMIT).subscribe(spots => {
        this.setSpots(spots);
      })
    }else {
      this.apiService.getUserSpots(this.username, [], this.SPOT_LIMIT).subscribe(spots => {
        this.setSpots(spots);
      })
    }
  }

  loadMoreSpots() {
    this.showLoadNewSpots = false;
    if (this.savedSpots) {
        this.apiService.getSavedSpots(this.spotsSaved.map(spot => spot.id), this.SPOT_LIMIT).subscribe(spots => {
            this.addSpots(spots);
        })
    }else {
      this.apiService.getUserSpots(this.username, this.spots.map(spot => spot.id), this.SPOT_LIMIT).subscribe(spots => {
        this.addSpots(spots);
      })
    }
  }

  getSpotImage(spot: Spot) {
    return getSpotImage(spot.pictures[0]);
  }

  private addSpots(spots: {hasMore: boolean, spots: Spot[]}) {
    this.spots.push(...spots.spots);
    if (spots.hasMore) {
      this.showLoadNewSpots = true;
    }
  }

  private setSpots(spots: {hasMore: boolean, spots: Spot[]}) {
    this.spots = spots.spots;
    if (spots.hasMore) {
      this.showLoadNewSpots = true;
    }
  }
}

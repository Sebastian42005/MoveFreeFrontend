import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
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
    @ViewChild('imgElement', {static: false}) imgElement: ElementRef | undefined;
    showLoadNewSpots = false;
    @Input() username = "";
    emptySpot: Spot = {
        id: '',
        description: '',
        location: {
            id: '',
            latitude: 0,
            longitude: 0,
            city: ''
        },
        spotType: [],
        user: '',
        pictures: []
    };

    spots = [{
        "spot": this.emptySpot,
        "currentImageIndex": 0
    }];

    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit(): void {
        this.getUserSpots();
        this.isUploadFinished();
        this.changeCurrentImage();
    }

    changeCurrentImage() {
        setInterval(() => {
            this.spots.forEach(spot => {
                if (spot.currentImageIndex < spot.spot.pictures.length - 1) {
                    spot.currentImageIndex++;
                } else {
                    spot.currentImageIndex = 0;
                }
            })
        }, 9000);
    }

    showSpot(spotId: string) {
        this.router.navigate(["spot/" + spotId]).then(() => {
        });
    }

    isUploadFinished() {
        isUploadFinishedEventEmitter.subscribe(spot => {
            this.spots.unshift(spot)
        });
    }

    getUserSpots() {
        this.showLoadNewSpots = false;
        this.apiService.getUserSpots(this.username, [], 6).subscribe(spots => {
            this.spots = spots.map(spot => this.spotToSpotWithImageIndex(spot));
            if (spots.length == 6) {
                this.showLoadNewSpots = true;
            }
        })
    }

    loadMoreSpots() {
        this.showLoadNewSpots = false;
        this.apiService.getUserSpots(this.username, this.spots.map(spot => spot.spot.id), 6).subscribe(spots => {
            this.spots.push(...spots.map(spot => this.spotToSpotWithImageIndex(spot)));
            if (spots.length == 6) {
                this.showLoadNewSpots = true;
            }
        })
    }

    getSpotImage(spot: any) {
        return getSpotImage(spot.spot.pictures[spot.currentImageIndex]);
    }

    spotToSpotWithImageIndex(spot: Spot): any {
        return {
            "spot": spot,
            "currentImageIndex": 0
        };
    }
}

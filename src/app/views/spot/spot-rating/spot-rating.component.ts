import {Component, Input, OnInit} from '@angular/core';
import {Rating} from "../../../api/dataclasses/Rating";
import {ApiService} from "../../../api/api.service";
import {Spot} from "../../../api/dataclasses/Spot";
import {MatDialog} from "@angular/material/dialog";
import {RateSpotComponent} from "./rate-spot/rate-spot.component";
import {ButtonType} from "../../../components/button/button.component";
import {LoginComponent} from "../../../components/login/login/login.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-spot-rating',
    templateUrl: './spot-rating.component.html',
    styleUrls: ['./spot-rating.component.scss']
})
export class SpotRatingComponent implements OnInit {
    @Input() spot: Spot = {
        "id": 0,
        "description": "",
        "location": {
            "id": 0,
            "latitude": 0,
            "longitude": 0,
            "city": ""
        },
        "spotTypes": [],
        "createdAt": "",
        "user": "",
        "rating": 0,
        "pictures": []
    };
    ratings: Rating[] = [];
    buttonType = ButtonType.ANIMATION;

    constructor(private apiService: ApiService, private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this.apiService.getSpotRating(this.spot.id).subscribe(ratings => {
            this.ratings = ratings;
        });
    }

    openRateSpotDialog() {
        this.matDialog.open(RateSpotComponent, {data: this.spot}).afterClosed().subscribe(rating => {
            this.apiService.rateSpot(this.spot.id, rating.message, rating.rating).subscribe({
                next: rating => {
                    this.ratings.forEach(current => {
                        if (current.username === rating.username) {
                            this.ratings.splice(this.ratings.indexOf(current), 1);
                        }
                    });
                    this.ratings.push(rating);
                    this.setSpotRating();
                },
                error: (error: HttpErrorResponse) => {
                    if (error.status === 403) {
                        this.matDialog.open(LoginComponent);
                    }
                }
            });
        });
    }

    setSpotRating() {
        let sum = 0;
        this.ratings.forEach(rating => {sum += rating.stars});
        const length = this.ratings.length
        this.spot.rating = sum / length;
    }
}

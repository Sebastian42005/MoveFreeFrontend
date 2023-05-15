import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService, getSpotImage} from "../../api/api.service";
import {Spot} from "../../api/dataclasses/Spot";
import {HttpErrorResponse} from "@angular/common/http";
import {ImageItem} from "ng-gallery";

@Component({
    selector: 'app-spot',
    templateUrl: './spot.component.html',
    styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit {
    spotLoaded = false;
    spot: Spot | undefined = undefined;
    spotPictures: ImageItem[] = [];

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.apiService.getSpot(params['id']).subscribe(spot => {
                this.spotLoaded = true;
                this.spot = spot;
                this.spotPictures.push(...spot.pictures.map(picture => {
                    const url = getSpotImage(picture)
                    return new ImageItem({src: url, thumb: url})
                }))
            }, (error: HttpErrorResponse) => {
                this.spotLoaded = true;
                if (error.status == 404) {
                    this.spot = undefined;
                }
            })
        })
    }
}

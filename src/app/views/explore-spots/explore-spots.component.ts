import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../api/dataclasses/User";
import {ApiService} from "../../api/api.service";
import {GridGenerator, GridSpot} from "../../helper/GridGenerator";
import {searchEmitter} from "../../components/search/search.component";


@Component({
    selector: 'app-explore-spots',
    templateUrl: './explore-spots.component.html',
    styleUrls: ['./explore-spots.component.scss'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({opacity: 0}),
                animate('1s ease-in', style({opacity: 1})),
            ]),
        ]),
    ]
})

export class ExploreSpotsComponent implements OnInit {
    MAX_SPOTS = 10;
    ownProfile: User | undefined = undefined;
    spots: GridSpot[] = [];
    isSpotsLoaded = false;
    search = "";
    selectedSpotType = "";
    showLoadNewSpots = false;

    constructor(private apiService: ApiService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.apiService.getOwnProfile().subscribe(own => {
            this.ownProfile = own;
        });

        this.activatedRoute.queryParams.subscribe(params => {
            this.selectedSpotType = params["spotType"] ?? "";
            this.search = params["search"] ?? "";
        });

        searchEmitter.subscribe(search => {
            this.router.navigate([], {queryParams: {search: this.search, spotType: this.selectedSpotType}}).then()
            this.search = search;
            this.getSpots(search);
        });
    }

    lastSearch = "";
    firstSearch = true

    getSpots(search: string) {
        if (search == this.lastSearch && !this.firstSearch) return;
        this.firstSearch = false;
        this.isSpotsLoaded = false;
        this.lastSearch = search
        this.showLoadNewSpots = false;
        this.router.navigate([], {queryParams: {search: this.search, spotType: this.selectedSpotType}}).then()
        this.apiService.getAllSpots(this.selectedSpotType, search, [], this.MAX_SPOTS).subscribe(spots => {
            this.isSpotsLoaded = true;
            let gridGenerator = new GridGenerator(spots.spots);
            this.spots = gridGenerator.getGrid();
            if (spots.hasMore) {
                this.showLoadNewSpots = true;
            }
        });
    }

    loadMoreSpots() {
        this.showLoadNewSpots = false;
        this.apiService.getAllSpots(this.selectedSpotType, this.search, this.spots.map(spot => spot.spot.id), this.MAX_SPOTS).subscribe(spots => {
            let gridGenerator = new GridGenerator(spots.spots);
            gridGenerator.getGrid().forEach(currentSpot => {
                this.spots.push(currentSpot)
            })
            if (spots.hasMore) {
                this.showLoadNewSpots = true;
            }
        });
    }

    filterSpots(spotType: any) {
        this.isSpotsLoaded = false;
        this.selectedSpotType = spotType
        this.showLoadNewSpots = false;
        this.router.navigate([], {queryParams: {search: this.search, spotType: spotType}}).then()
        this.apiService.getAllSpots(spotType, this.search, [], this.MAX_SPOTS).subscribe(spots => {
            this.isSpotsLoaded = true;
            let gridGenerator = new GridGenerator(spots.spots);
            this.spots = gridGenerator.getGrid();
            if (spots.hasMore) {
                this.showLoadNewSpots = true;
            }
        });
    }
}

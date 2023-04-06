import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Spot} from "../api/dataclasses/Spot";
import {User} from "../api/dataclasses/User";
import {HttpErrorResponse} from "@angular/common/http";
import grid6List from "../../assets/gridtemplates/grid6.json"
import grid5List from "../../assets/gridtemplates/grid5.json"
import gridRemaining from "../../assets/gridtemplates/gridRemaining.json"
import {animate, style, transition, trigger} from "@angular/animations";
import {searchEmitter} from "./explore-spots-header/explore-spots-header.component";
import {ActivatedRoute, Router} from "@angular/router";


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
    ],
})

export class ExploreSpotsComponent implements OnInit {
    MAX_SPOTS = 10;
    ownProfile: User | undefined = undefined;
    spots: GridSpot[] = [];
    profileImg = "";
    isSpotsLoaded = false;
    search = "";
    showLoadNewSpots = false;

    constructor(private apiService: ApiService, private router: Router, private activeRouter: ActivatedRoute) {
    }

    ngOnInit(): void {
        if (localStorage.getItem("token") != null) {
            this.apiService.getOwnProfile().subscribe(own => {
                this.ownProfile = own;
                this.profileImg = `http://localhost:8080/api/user/${own.username}/profile`
            }, (error: HttpErrorResponse) => {
                if (error.status == 403) {
                    this.profileImg = "assets/images/profile.png"
                }
            });
        } else {
            this.profileImg = "assets/images/profile.png"
        }

        searchEmitter.subscribe(search => {
            this.router.navigate([], {queryParams: {search: search}}).then()
            this.search = search;
            this.getSpots(search)
        })
    }
    lastSearch = "";
    firstSearch = true
    getSpots(search: string) {
        if (search == this.lastSearch && !this.firstSearch) return;
        this.firstSearch = false;
        this.isSpotsLoaded = false;
        this.lastSearch = search
        this.showLoadNewSpots = false;
        this.apiService.getAllSpots([], search, [], this.MAX_SPOTS).subscribe(spots => {
            let spotsLength = spots.length;
            this.isSpotsLoaded = true;
            let gridGenerator = new GridGenerator(spots);
            this.spots = gridGenerator.getGrid();
            if (spotsLength >= this.MAX_SPOTS) this.showLoadNewSpots = true;
        });
    }

    loadMoreSpots() {
        this.showLoadNewSpots = false;
        this.apiService.getAllSpots([], this.search, this.spots.map(spot => spot.spot.id), this.MAX_SPOTS).subscribe(spots => {
            let spotsLength = spots.length;
            let gridGenerator = new GridGenerator(spots);
            gridGenerator.getGrid().forEach(currentSpot => {
                this.spots.push(currentSpot)
            })
            if (spotsLength >= this.MAX_SPOTS) this.showLoadNewSpots = true;
        });
    }
}

export interface GridSpot {
    spot: Spot,
    imageUrl: string,
    row: number,
    col: number
}

class GridGenerator {

    spots: Spot[] = [];

    grid: GridSpot[] = [];

    constructor(spots: Spot[]) {
        this.spots = spots;
        while (spots.length > 0) {
            if (spots.length > 6) {
                let randomNum = this.getRandomNumber(5, 6);
                this.generateGrid(randomNum);
            } else {
                if (spots.length == 6) {
                    this.generateGrid(6);
                } else if (spots.length == 5) {
                    this.generateGrid(5);
                } else {
                    this.generateGrid(spots.length)
                }
            }
        }
    }

    private generateGrid(blocks: number) {
        switch (blocks) {
            case 6: {
                this.pushToGrid(6, grid6List);
                break;
            }
            case 5: {
                this.pushToGrid(5, grid5List);
                break;
            }
            default: {
                this.pushRemainingToGrid(blocks)
            }
        }
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private pushToGrid(num: number, list: any) {
        for (let i = 0; i < num; i++) {
            let currentSpot = this.spots[i];
            if (currentSpot != undefined) {
                let randomGridTemplate = list[this.getRandomNumber(0, list.length - 1)]
                let gridSpot: GridSpot = {
                    spot: currentSpot,
                    imageUrl: `http://localhost:8080/api/spot/pictures/${currentSpot.pictures[0]}`,
                    row: randomGridTemplate[i].row,
                    col: randomGridTemplate[i].col,
                };
                this.grid.push(gridSpot);
            }
        }
        this.spots.splice(0, num);
    }

    private pushRemainingToGrid(num: number) {
        for (let i = 0; i < num; i++) {
            let currentSpot = this.spots[i];
            if (currentSpot != undefined) {
                let randomGridTemplate = gridRemaining[num - 1]
                let gridSpot: GridSpot = {
                    spot: currentSpot,
                    imageUrl: `http://localhost:8080/api/spot/pictures/${currentSpot.pictures[0]}`,
                    row: randomGridTemplate[i].row,
                    col: randomGridTemplate[i].col,
                };
                this.grid.push(gridSpot);
            }
        }
        this.spots.splice(0, num);
    }

    getGrid(): GridSpot[] {
        return this.grid;
    }
}

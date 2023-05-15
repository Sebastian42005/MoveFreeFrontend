import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from "../../../api/dataclasses/User";
import {getUserProfileImage} from "../../../api/api.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatDialog} from "@angular/material/dialog";
import {UploadSpotComponent} from "../../../components/upload-spot/upload-spot.component";

@Component({
    selector: 'app-own-profile',
    templateUrl: './own-profile.component.html',
    styleUrls: ['./own-profile.component.scss'],
    animations: [
        trigger('navigationAnimation', [
            state('spots', style({
                transform: 'translateX(0%)'
            })),
            state('savedSpots', style({
                transform: 'translateX(100%)'
            })),
            transition('spots <=> savedSpots', [
                animate('0.2s')
            ]),
        ])
    ]
})
export class OwnProfileComponent implements OnInit {
    navigation = "spots"
    profileImg = "";

    @Input() user: User = {
        username: "",
        description: "",
        spotsAmount: 0,
        averageRating: 0,
        isFollowed: false,
        follower: 0,
        follows: 0,
    };

    infos = [
        {
            title: "Follower",
            value: this.user.follower.toString(),
            image: "assets/images/follower.png"
        },
        {
            title: "Follows",
            value: this.user.follows.toString(),
            image: "assets/images/follows.png"
        },
        {
            title: "Spots",
            value: this.user.spotsAmount.toString(),
            image: "assets/images/spot.png"
        },
        {
            title: "Spot Rating",
            value: this.user.averageRating.toString(),
            image: "assets/images/star.png"
        }
    ]

    scrWidth: any;
    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.scrWidth = window.innerWidth;
    }

    constructor(private matDialog: MatDialog) {
        this.getScreenSize();
    }

    openUploadSpotDialog() {
        this.matDialog.open(UploadSpotComponent);
    }

    ngOnInit(): void {
        this.profileImg = getUserProfileImage(this.user.username);
    }

    changeNavigation(navigation: string) {
        this.navigation = navigation;
    }
}

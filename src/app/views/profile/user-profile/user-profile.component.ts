import {Component, HostListener, Input, OnInit} from '@angular/core';
import {User} from "../../../api/dataclasses/User";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../api/api.service";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

    @Input() user: User = {
        username: "",
        description: "",
        spotsAmount: 0,
        averageRating: 0,
        isFollowed: false,
        follower: 0,
        follows: 0
    };
    profileImg = "";

    scrWidth: any;

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
        this.scrWidth = window.innerWidth;
    }

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
        this.getScreenSize();
    }

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

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.apiService.getUser(params['username']).subscribe(user => {
                this.user = user;
                this.profileImg = `http://localhost:8080/api/user/${user.username}/profile`;
            });
        });
    }
}

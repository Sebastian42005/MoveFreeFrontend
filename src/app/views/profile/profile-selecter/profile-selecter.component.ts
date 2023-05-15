import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../api/api.service";
import {User} from "../../../api/dataclasses/User";

@Component({
    selector: 'app-profile-selecter',
    templateUrl: './profile-selecter.component.html',
    styleUrls: ['./profile-selecter.component.scss']
})
export class ProfileSelecterComponent implements OnInit {

    isLoading = true;
    isOwnProfile = false;
    user: User | undefined = undefined;

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.apiService.getUser(params['username']).subscribe(user => {
                this.isLoading = false;
                this.user = user;
                this.isOwnProfile = params['username'] == localStorage.getItem('username');
            }, () => {
                this.isLoading = false;
            })
        })
    }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../api/dataclasses/User";
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    "username": "",
    "role": "USER",
    "spots": [],
    "follows": 0,
    "follower": 0,
    "companyDTO": null
  }

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
       this.apiService.getUser(param['username']).subscribe(user => {
         this.user = user
       })
    })
  }


}

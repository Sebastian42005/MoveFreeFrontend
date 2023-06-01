import {Component, OnInit} from '@angular/core';
import {ApiService, getUserProfileImage} from "../../../api/api.service";

@Component({
  selector: 'app-home-page-explore-user',
  templateUrl: './home-page-explore-user.component.html',
  styleUrls: ['./home-page-explore-user.component.scss']
})
export class HomePageExploreUserComponent implements OnInit {

  users: string[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getTopUser().subscribe((users: any) => {
      this.users = users.map((user: any) => user.username);
    })
  }

  getUserProfile(username: string) {
    return getUserProfileImage(username);
  }
}

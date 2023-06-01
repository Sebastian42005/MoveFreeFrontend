import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {showUserListAnimation} from "../../animations/animations";
import {ApiService} from "../../api/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: [showUserListAnimation]
})
export class UserListComponent implements OnInit {
    @Input() showUserList = false;
    @Input() searchEmitter = new EventEmitter<string>();
    users: string[] = [];

    constructor(private apiService: ApiService,
                private router: Router) {}

    ngOnInit(): void {
        this.searchEmitter.subscribe((search: string) => {
            this.apiService.searchUsers(search).subscribe(users => {
                this.users = users;
            });
        })
    }

    displayUser() {
        this.router.navigate(['/user', this.users[0]]).then()
    }
}

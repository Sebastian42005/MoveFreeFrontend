import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {scaleAnimation} from "../../animations/animations";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [scaleAnimation]
})
export class SearchComponent implements OnInit{
    @Input() isLoading = true;
    @Input() search = "";
    oldSearch = "";
    searchingSpot = true;
    placeholder = "Search Spot";
    showUserList = false;
    searchUserEmitter = new EventEmitter<string>();

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.search = this.oldSearch;
            this.showUserList = false;
        } else {
            this.showUserList = !this.searchingSpot;
        }
    }

    constructor(private router: ActivatedRoute, private elementRef: ElementRef) {
    }

    changeSearchMode() {
        this.searchingSpot = !this.searchingSpot;
        if (this.searchingSpot) {
            this.placeholder = "Search Spot";
        } else {
            this.placeholder = "Search User";
        }
    }

    searchByMode() {
        this.oldSearch = this.search;
        if (this.searchingSpot) {
            this.searchSpot();
        } else {
            this.searchUser();
        }
    }

    searchSpot() {
        searchEmitter.emit(this.search);
    }

    searchUser() {
        this.searchUserEmitter.emit(this.search);
    }

    ngOnInit(): void {
        this.oldSearch = this.search;
        searchEmitter.emit(this.search);
    }
}

export const searchEmitter = new EventEmitter<string>();

import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {scaleAnimation} from "../../../animations/animations";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-explore-spots-header',
  templateUrl: './explore-spots-header.component.html',
  styleUrls: ['./explore-spots-header.component.scss'],
  animations: [scaleAnimation]
})
export class ExploreSpotsHeaderComponent implements OnInit{
  @Input() isLoading = true;
  @Input() profileImg = "assets/images/profile.png";
  search = ""
  isImageLoaded = false;
  username = localStorage.getItem("username")

  constructor(private router: ActivatedRoute) {

  }


  searchSpot() {
    searchEmitter.emit(this.search);
  }

  getBackgroundImage() {
    return `background-image: url(${this.profileImg})`
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
        this.search = params['search'] || "";
        searchEmitter.emit(this.search)
    })
  }
}

export const searchEmitter = new EventEmitter<string>();

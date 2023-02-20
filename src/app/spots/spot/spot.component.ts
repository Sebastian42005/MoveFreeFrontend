import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Spot} from "../../api/dataclasses/Spot";
import * as Console from "console";

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements AfterViewInit {

  @Input() spot: Spot;

  @ViewChild('description') description: any;

  imageUrl = "assets/not_found.webp"

  descriptionHeight = 0

  currentImageIndex = 0

  fullText = true

  constructor() {
  }


  ngAfterViewInit(): void {
    this.descriptionHeight = this.description.nativeElement.offsetHeight
  }

  increaseImage() {
    this.currentImageIndex ++
  }

  decreaseImage() {
    this.currentImageIndex --
  }

  showFullText() {
    if (this.descriptionHeight > 40) {
      return this.fullText ? 'trimToTwoLines' : 'noTrim';
    }else {
      return 'normal';
    }
  }
}

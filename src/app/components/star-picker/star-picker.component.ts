import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-star-picker',
    templateUrl: './star-picker.component.html',
    styleUrls: ['./star-picker.component.scss']
})
export class StarPickerComponent implements OnInit {
    @Input() rating: number = 0;
    @Input() starsCount: number = 5;
    hoverRating: number = 0;
    @Input() gap: string = "1px";
    @Input() starSize: string = "40px";
    @Output() rateSpotEmitter= new EventEmitter<number>();
    isHovering: boolean = false;
    starList: number[] = [];

    ngOnInit(): void {
        this.starList = Array(this.starsCount).fill(this.starsCount).map((x, i) => i);
    }


    starLeave() {
        this.isHovering = false;
        this.hoverRating = 0;
    }

    starEnter(star: number) {
        this.isHovering = true;
        this.hoverRating = star + 1;
    }

    getShowStar(index: number): boolean {
        if (this.isHovering) {
            return index < this.hoverRating;
        }else {
            return index < this.rating;
        }
    }

    rateSpot(stars: number) {
        this.rating = stars;
        this.rateSpotEmitter.emit(stars);
    }
}

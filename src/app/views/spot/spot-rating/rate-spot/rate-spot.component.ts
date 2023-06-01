import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Spot} from "../../../../api/dataclasses/Spot";
import {ButtonType} from "../../../../components/button/button.component";

@Component({
    selector: 'app-rate-spot',
    templateUrl: './rate-spot.component.html',
    styleUrls: ['./rate-spot.component.scss']
})
export class RateSpotComponent {
    rating = 0;
    message = "";
    buttonRateType = ButtonType.ANIMATION;

    constructor(@Inject(MAT_DIALOG_DATA) public spot: Spot, private matDialogRef: MatDialogRef<RateSpotComponent>) {
    }

    uploadRating() {
        if (this.rating > 0) {
            this.matDialogRef.close({rating: this.rating, message: this.message});
        }
    }

    setRating(event: any) {
        this.rating = event;
    }
}

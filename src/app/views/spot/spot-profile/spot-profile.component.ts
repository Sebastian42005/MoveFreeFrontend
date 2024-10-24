import {Component, Input} from '@angular/core';
import {Spot} from "../../../api/dataclasses/Spot";

@Component({
    selector: 'app-spot-profile',
    templateUrl: './spot-profile.component.html',
    styleUrls: ['./spot-profile.component.scss']
})
export class SpotProfileComponent {

    @Input() spot: Spot = {
        "id": 0,
        "description": "",
        "location": {
            "id": 0,
            "latitude": 0,
            "longitude": 0,
            "city": ""
        },
        "spotTypes": [],
        "createdAt": "",
        "user": "",
        "rating": 0,
        "pictures": []
    };
}

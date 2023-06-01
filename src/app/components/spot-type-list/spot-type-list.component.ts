import {Component, Input} from '@angular/core';
import {getSpotTypeImage} from "../../api/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-spot-type-list',
    templateUrl: './spot-type-list.component.html',
    styleUrls: ['./spot-type-list.component.scss']
})
export class SpotTypeListComponent {
    @Input() spotTypes: string[] = [];

    constructor(private router: Router) {
    }

    getSpotTypeIcon(spotType: string): string {
        return getSpotTypeImage(spotType);
    }

    filterSpotsByType(spotType: string) {
        this.router.navigate(["explore"], {queryParams: {spotType: spotType}}).then();
    }
}

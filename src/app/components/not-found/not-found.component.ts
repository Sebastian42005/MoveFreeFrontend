import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

    @Input() message = "Page not found"
    @Input() width = "100vw"
    @Input() height = "90vh"

    private images = [
        "../../../assets/images/notfound/not_found.PNG",
        "../../../assets/images/notfound/not_found2.PNG",
        "../../../assets/images/notfound/not_found3.PNG",
        "../../../assets/images/notfound/not_found4.PNG",
        "../../../assets/images/notfound/not_found5.PNG",
    ]

    randomImage = this.images[Math.floor(Math.random() * this.images.length)]
}

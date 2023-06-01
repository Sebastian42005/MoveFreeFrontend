import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../../api/api.service";
import {Router} from "@angular/router";
import {LocalStorageManager} from "../../../../helper/LocalStorageManager";
import {showMessageEmitter} from "../../../../app.component";

@Component({
    selector: 'app-spot-options',
    templateUrl: './spot-options.component.html',
    styleUrls: ['./spot-options.component.scss']
})
export class SpotOptionsComponent implements OnInit {

    @Input() spotId: string = "";

    constructor(private apiService: ApiService, private elementRef: ElementRef, private router: Router) {
    }

    deleteEventEmitter = new EventEmitter();
    saveEmitter = new EventEmitter();

    showOptionsMenu = false;
    isSaved = false
    optionsMenuItems: {name: string, icon: string, color: string | undefined, arrow: boolean, click: EventEmitter<any> | undefined}[] = []

    ngOnInit(): void {
        this.checkIsSaved();
        this.deleteEventEmitter.subscribe(() => {
            this.deleteSpot();
        })
        this.saveEmitter.subscribe(() => {
            this.saveSpot();
        });
    }

    checkIsSaved() {
        this.apiService.getIsSaved(this.spotId).subscribe(isSaved => {
            this.isSaved = isSaved.isSaved;
            this.optionsMenuItems = [
                {name: "Edit", icon: "edit", color: undefined, arrow: false, click: undefined},
                {name: isSaved.isSaved ? "Unsave" : "Save", icon: "bookmark", color: undefined, arrow: false, click: this.saveEmitter},
                {name: "Delete", icon: "delete", color: "#8F0000", arrow: false, click: this.deleteEventEmitter}
            ]
        });
    }

    saveSpot() {
        this.apiService.saveSpot(this.spotId).subscribe(() => {
            showMessageEmitter.emit({
                "message": this.isSaved ? "Spot unsaved" : "Spot saved",
                "error": false
            })
            this.isSaved = !this.isSaved;
            this.optionsMenuItems = [
                {name: "Edit", icon: "edit", color: undefined, arrow: false, click: undefined},
                {name: this.isSaved ? "Unsave" : "Save", icon: "bookmark", color: undefined, arrow: false, click: this.saveEmitter},
                {name: "Delete", icon: "delete", color: "#8F0000", arrow: false, click: this.deleteEventEmitter}
            ];
            this.showOptionsMenu = false;
        })
    }

    deleteSpot() {
        this.apiService.deleteSpot(this.spotId).subscribe(() => {
            showMessageEmitter.emit({
                "message": "Spot deleted",
                "error": false
            })
            this.router.navigate([`/user/${LocalStorageManager.getUsername()}`]).then()
        })
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.showOptionsMenu = false;
        }
    }

}

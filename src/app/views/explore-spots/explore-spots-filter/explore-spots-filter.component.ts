import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService, getSpotTypeImage} from "../../../api/api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-explore-spots-filter',
  templateUrl: './explore-spots-filter.component.html',
  styleUrls: ['./explore-spots-filter.component.scss']
})
export class ExploreSpotsFilterComponent implements OnInit{
  selectedView = "list";
  spotTypes: any[] = [];
  @Input() spotType = "";
  @Output() onSpotTypeSelected = new EventEmitter<string>();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getSpotTypes();
  }

  getSpotTypes() {
    this.apiService.getSpotTypes().subscribe(spotTypes => {
      this.spotTypes = spotTypes.map(spotType => {
        return {
          "image": getSpotTypeImage(spotType.name),
          "text": spotType.name
        }
      })
    })
  }

  selectSpotType(event: any) {
    this.onSpotTypeSelected.emit(event)
  }
}

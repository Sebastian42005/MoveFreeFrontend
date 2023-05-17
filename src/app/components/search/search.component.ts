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
  oldSearch = "";
  search = "";

  searchSpot() {
    this.oldSearch = this.search
    searchEmitter.emit(this.search);
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.search = this.oldSearch;
    }
  }
  constructor(private router: ActivatedRoute, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.search = params['search'] || "";
      this.oldSearch = this.search;
      searchEmitter.emit(this.search)
    })
  }
}

export const searchEmitter = new EventEmitter<string>();

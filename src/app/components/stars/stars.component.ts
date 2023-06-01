import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit{
  @Input() rating: number = 0;
  @Input() starsCount: number = 5;
  @Input() gap: string = "0px";
  @Input() starSize: string = "40px";
  starList: number[] = [];

  ngOnInit(): void {
    this.starList = Array(this.starsCount).fill(this.starsCount).map((x, i) => i);
  }
}

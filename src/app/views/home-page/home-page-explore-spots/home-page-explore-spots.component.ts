import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-explore-spots',
  templateUrl: './home-page-explore-spots.component.html',
  styleUrls: ['./home-page-explore-spots.component.scss']
})
export class HomePageExploreSpotsComponent {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  images = [
    {
      "image": "assets/images/spot/spot1.jpg",
      "text": "Spot 1 Description",
      "cols": 4,
      "rows": 1
    },
    {
      "image": "assets/images/spot/spot2.jpg",
      "text": "Spot 2 Description",
      "cols": 3,
      "rows": 1
    },
    {
      "image": "assets/images/spot/spot3.jpeg",
      "text": "Spot 3 Description",
      "cols": 2,
      "rows": 2
    },
    {
      "image": "assets/images/spot/spot4.jpg",
      "text": "Spot 4 Description",
      "cols": 5,
      "rows": 1
    },
    {
      "image": "assets/images/spot/spot5.jpg",
      "text": "Spot 5 Description",
      "cols": 2,
      "rows": 1
    }
  ]
}

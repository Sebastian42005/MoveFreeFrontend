import {Component, OnInit} from '@angular/core';
import {Feature, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import OlMap from 'ol/Map';
import VectorSource from "ol/source/Vector";
import {Point} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: OlMap;

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = new OlMap({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [48.210033, 16.363449],
        zoom: 5
      })
    });

    const markerLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([48.210033, 16.363449])
          })
        ]
      }),
      style: new Style({
        text: new Text({
          text: 'Mein Marker',
          font: '12px sans-serif',
          fill: new Fill({ color: '#000' }),
          backgroundFill: new Fill({ color: '#fff' }),
          padding: [5, 5, 5, 5],
          offsetY: -20
        })
      })
    });

    this.map.addLayer(markerLayer);

  }
}

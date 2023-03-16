export interface Spot {
  id:          number;
  description: string;
  location: Location;
  spotType: string;
  user: string;
  picture: number[];
}

export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  city: string;
}

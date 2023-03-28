export interface Spot {
  id:          string;
  description: string;
  location: Location;
  spotType: string;
  user: string;
  pictures: string[];
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  city: string;
}

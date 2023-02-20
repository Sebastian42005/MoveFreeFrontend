export interface Spot {
    id:          number;
    description: string;
    location:    Location;
    spotType:    string;
    user:        string;
    pictures:    number[];
}

export interface Location {
    id:        number;
    latitude:  number;
    longitude: number;
    city:      string;
}

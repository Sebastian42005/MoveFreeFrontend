export interface Spot {
    id: number;
    description: string;
    location: Location;
    spotTypes: string[];
    createdAt: string;
    user: string;
    rating: number;
    pictures: number[];
}

export interface Location {
    id: number;
    latitude: number;
    longitude: number;
    city: string;
}

export interface Spot {
    id: string;
    description: string;
    location: Location;
    spotTypes: string[];
    createdAt: string;
    user: string;
    rating: number;
    pictures: string[];
}

export interface Location {
    id: string;
    latitude: number;
    longitude: number;
    city: string;
}

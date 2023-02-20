import {Spot} from "./Spot";

export interface User {
    username:   string;
    role:       string;
    spots:      Spot[];
    follows:    number;
    follower:   number;
    companyDTO: null;
}

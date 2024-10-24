import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Spot} from "./dataclasses/Spot";
import {LoginResponse} from "./dataclasses/LoginResponse";
import {User} from "./dataclasses/User";
import {SpotType} from "./dataclasses/SpotType";
import {LocalStorageManager} from "../helper/LocalStorageManager";
import {Rating} from "./dataclasses/Rating";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  getSpotRating(spotId: number): Observable<Rating[]> {
    return this.get(`/spot/${spotId}/ratings`)
  }

  rateSpot(spotId: number, message: string, stars: number): Observable<Rating> {
    let body = {message: message, stars: stars}
    return this.put(`/spot/${spotId}/rate`, body)
  }

  getAllSpots(spotType: string, search?: string, alreadySeenList?: number[], limit?: number): Observable<{hasMore: boolean, spots: Spot[]}> {
    spotType = spotType ? spotType : ""
    search = search ? search : ""
    alreadySeenList = alreadySeenList ? alreadySeenList : []
    limit = limit ? limit : 5
    return this.get(`/spot/all?search=${search.toString()}&limit=${limit}&spotType=${spotType}&alreadySeenList=${alreadySeenList}`)
  }

  getSavedSpots(alreadySeenList?: number[], limit?: number): Observable<{hasMore: boolean, spots: Spot[]}> {
    alreadySeenList = alreadySeenList ? alreadySeenList : []
    limit = limit ? limit : 5
    return this.get(`/spot/saved?limit=${limit}&alreadySeenList=${alreadySeenList}`)
  }

  saveSpot(id: number): Observable<any> {
    return this.put(`/spot/${id}/save`, {})
  }

  getIsSaved(id: number): Observable<any> {
    return this.get(`/spot/${id}/isSaved`)
  }

  getTopUser(): Observable<any[]> {
    return this.get(`/user/top`)
  }

  getSpot(spotId: number): Observable<Spot> {
    return this.get(`/spot/${spotId}`)
  }

  login(username: string, password: string): Observable<LoginResponse> {
    LocalStorageManager.removeTokenAndUsername()
    let body = {username: username, password: password}
    return this.post("/authentication/login", body)
  }

  getSpotTypes(): Observable<SpotType[]> {
    return this.get("/spot/type")
  }

  searchUsers(search: string): Observable<string[]> {
    return this.get(`/user/search?search=${search}&limit=5`)
  }

  register(username: string, email: string, password: string): Observable<User> {
    LocalStorageManager.removeTokenAndUsername()
    let body = {username: username, email: email, password: password}
    return this.post<User>("/authentication/register", body)
  }

  async uploadSpot(images: File[], spotTypes: string[], description: string) {
    const body = {
      "description": description,
      "latitude": 0.0,
      "longitude": 0.0,
      "city": "Vienna",
      "spotTypes": spotTypes
    }

    const a: Spot = await this.postSpot(body)

    return this.postSpotImage(a, images);
  }

  private async postSpot(body: any): Promise<any> {
    return await new Promise((resolve) => {
      this.post("/spot/post", body).subscribe(spot => {
        resolve(spot)
      });
    });
  }

  private async postSpotImage(spot: Spot, images: File[]) {
    const formData = new FormData();
    for (const image of images) {
      formData.append("images", image)
    }
    return await new Promise((resolve) => {
      this.put(`/spot/${spot.id}/images`, formData).subscribe(spotWithImages => {
        resolve(spotWithImages)
      });
    });
  }

  deleteSpot(spotId: number): Observable<any> {
    return this.delete(`/spot/${spotId}`)
  }

  //User

  createUser(user: User): Observable<User> {
    return this.post<User>('/user', user)
  }

  updateUser(user: User) {
    return this.put<User>('/user', user)
  }

  getAllUsers(): Observable<User[]> {
    return this.get<User[]>('/user')
  }

  deleteUser(id: number): Observable<any> {
    return this.delete(`/user/${id}`)
  }

  getOwnProfile(): Observable<User> {
    return this.get("/user/own")
  }

  getOwnName(): Observable<User> {
    return this.get("/user/own/name")
  }

  getUser(username: string): Observable<User> {
    return this.get(`/user/${username}`)
  }

  getUsername(): Observable<string> {
    return this.get("/user/own/username")
  }

  getUserSpots(username: string, alreadySeenList?: number[], limit?: number): Observable<{hasMore: boolean, spots: Spot[]}> {
    username = username ? username : ""
    alreadySeenList = alreadySeenList ? alreadySeenList : []
    limit = limit ? limit : 5
    return this.get(`/user/${username}/spots?limit=${limit}&alreadySeenList=${alreadySeenList}`)
  }

  private get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(baseUrl + url, {
      headers: {
        "Authorization": "Bearer " + LocalStorageManager.getToken(),
      }
    });
  }

  private post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(baseUrl + url, body, {
      headers: {
        "Authorization": "Bearer " + LocalStorageManager.getToken()
      }
    });
  }

  private delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(baseUrl + url, {
      headers: {
        "Authorization": "Bearer " + LocalStorageManager.getToken()
      }
    });
  }

  private put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(baseUrl + url, body, {
      headers: {
        "Authorization": "Bearer " + LocalStorageManager.getToken()
      }
    });
  }
}

export const baseUrl = 'http://localhost:8080/api'

export function getSpotImage(pictureId: number): string {
  return "http://localhost:8080/api" + `/spot/images/${pictureId}`
}

export function getSpotTypeImage(name: string) {
  return `http://localhost:8080/api/spot/type/${name}`
}

export function getUserProfileImage(username: string): string {
  return `http://localhost:8080/api/user/${username}/profile`
}

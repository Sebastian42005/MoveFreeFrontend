import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Spot} from "./dataclasses/Spot";
import {LoginResponse} from "./dataclasses/LoginResponse";
import {User} from "./dataclasses/User";
import {SpotType} from "./dataclasses/SpotType";
import {LocalStorageManager} from "../helper/LocalStorageManager";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllSpots(spotType: string, search?: string, alreadySeenList?: string[], limit?: number): Observable<Spot[]> {
    spotType = spotType ? spotType : ""
    search = search ? search : ""
    alreadySeenList = alreadySeenList ? alreadySeenList : []
    limit = limit ? limit : 5
    return this.get(`/spot/all?search=${search.toString()}&limit=${limit}&spotType=${spotType}&alreadySeenList=${alreadySeenList}`)
  }

  public getSpot(spotId: string): Observable<Spot> {
    return this.get(`/spot/${spotId}`)
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    LocalStorageManager.removeTokenAndUsername()
    let body = {username: username, password: password}
    return this.post("/authentication/login", body)
  }

  public getSpotTypes(): Observable<SpotType[]> {
    return this.get("/spot/type")
  }

  public register(username: string, email: string, password: string): Observable<User> {
    LocalStorageManager.removeTokenAndUsername()
    let body = {username: username, email: email, password: password}
    return this.post<User>("/authentication/register", body)
  }

  public async uploadSpot(images: File[], spotTypes: string[], description: string) {
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

  public getOwnProfile(): Observable<User> {
    return this.get("/user/own")
  }

  public getUser(username: string): Observable<User> {
    return this.get(`/user/${username}`)
  }

  public getUsername(): Observable<string> {
    return this.get("/user/own/username")
  }

  public getUserSpots(username: string, alreadySeenList?: string[], limit?: number): Observable<Spot[]> {
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

export function getSpotImage(pictureId: string): string {
  return "http://localhost:8080/api" + `/spot/images/${pictureId}`
}

export function getSpotTypeImage(name: string) {
  return `http://localhost:8080/api/spot/type/${name}`
}

export function getUserProfileImage(username: string): string {
  return `http://localhost:8080/api/user/${username}/profile`
}

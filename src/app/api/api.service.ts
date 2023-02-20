import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse} from "./dataclasses/LoginResponse";
import {User} from "./dataclasses/User";
import {Spot} from "./dataclasses/Spot";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  public getAllSpots(spotTypes?: string[], cities?: string[], limit?: number): Observable<Spot[]> {
    spotTypes = spotTypes ? spotTypes : []
    cities = cities ? cities : []
    limit = limit ? limit : 5
    return this.get(`/spot/all?city=${cities.toString()}&limit=${limit}&spotTypes=${spotTypes}`)
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    let body = {username: username, password: password}
    return this.post("/authentication/login", body)
  }

  public register(username: string, email: string, password: string): Observable<User> {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    let body = {username: username, email: email, password: password}
    return this.post("/authentication/register", body)
  }

  public getOwnProfile(): Observable<User> {
    return this.get("/user")
  }

  public getUser(username: string): Observable<User> {
    return this.get(`/user/${username}`)
  }

  //request helper methods
  baseUrl = "http://localhost:8080/api";

  private get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    });
  }

  private post<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(this.baseUrl + url, body,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }

  private delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this.baseUrl + url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }

  private put<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(this.baseUrl + url, body,{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });
  }
}

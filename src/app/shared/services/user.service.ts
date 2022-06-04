import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/auth/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUserItems(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:8080/api/test/users');
  }
}

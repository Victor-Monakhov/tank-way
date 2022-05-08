import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../interfaces/user.interface";
import {Paths} from "../enums/paths.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signUp(user: IUser): Observable<any> {
    return this.http.post(Paths.signUp,
      {
        username: user.nickname,
        email: user.email,
        password: user.password,
        //role: user.role,
        token: user.token
      });
  }
}

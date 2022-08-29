import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../interfaces/auth/user.interface';

const baseUrl = 'http://localhost:8080/api/test/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor(private http: HttpClient) {
  }

  public getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(baseUrl);
  }

  public get(id: any): Observable<IUser> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  public update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  public delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  public deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}

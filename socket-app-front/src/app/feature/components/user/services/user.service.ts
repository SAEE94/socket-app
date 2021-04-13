import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../../../user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(page: number, size: number): Observable<User> {
    return this.http.get<User>(`${environment.backendurl}/user?page=${page}&size=${size}`);
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.backendurl}/user`, user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendurl}/user/${id}`);
  }
}

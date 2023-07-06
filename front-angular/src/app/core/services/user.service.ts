import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TSearchedUser } from '@core/types/search-user.type';
import { TUserDetails } from '@core/types/user-details.type';
import { environment } from '@environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl: string = environment.api;

  public getUser(userName: string): Observable<TUserDetails> {
    return this._http.get<TUserDetails>(`${this._apiUrl}users/${userName}`);
  }

  public searchUsers(searchString: string): Observable<TSearchedUser[]> {
    const params = new HttpParams()
      .set('q', searchString);

    return this._http.get<{ data: TSearchedUser[] }>(`${this._apiUrl}users/`, { params })
               .pipe(
                 map(({ data }) => data)
               );
  }
}

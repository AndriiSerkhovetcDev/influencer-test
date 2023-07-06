import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, combineLatest, forkJoin, map, Observable, of, tap} from 'rxjs';

@Injectable()
export class UsersService {
    private authKey: string;
    constructor(private httpService: HttpService) {
        this.authKey = process.env.AUTH_KEY;
    }

    public searchUsers(query: string): Observable<any> {
        return this.httpService.get(`https://imai.co/api/dict/users/`, {
            headers: {
                authkey: this.authKey
            },
            params: {
                q: query,
                type: 'search',
                platform: 'instagram',
                limit: 5
            }
        }).pipe(
            map(users => users.data),
            catchError(error => {
                console.error('Error fetching user contacts:', error);
                return of(null);
            })
        );
    }

    public getUserFeeds(username: string): Observable<any> {
        return this.httpService.get(`https://imai.co/api/raw/ig/user/feed/`, {
            headers: {
                authkey: this.authKey
            },
            params: {
                url: username
            }
        }).pipe(
            tap(response => console.log(response)),
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching user info:', error);
                return of(null);
            })
        );
    }

    public getUserInfo(username: string): Observable<any> {
        return this.httpService.get(`https://imai.co/api/exports/contacts/`, {
            headers: {
                authkey: this.authKey
            },
            params: {
                url: username,
                platform: 'instagram',
            }
        }).pipe(
            tap(response => console.log(response)),
            map(response => response.data),
            catchError(error => {
                console.error('Error fetching user info:', error);
                return of(null);
            })
        );
    }

    public getUserAndUserFeeds(username: string): Observable<any> {
        return combineLatest([
            this.getUserFeeds(username),
            this.getUserInfo(username)
        ]).pipe(
            map(([userFeedsData, userInfo]) => {
                return { feeds: userFeedsData , user: userInfo.user_profile };
            })
        );
    }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, combineLatest, forkJoin, map, Observable, of, tap} from 'rxjs';
import {TUserDetails} from "../../types/user-details.type";
import {TSearchedUser} from "../../types/search-user.type";

@Injectable()
export class UsersService {
    private authKey: string;
    constructor(private httpService: HttpService) {
        this.authKey = process.env.AUTH_KEY;
    }

    public searchUsers(query: string): Observable<TSearchedUser[]> {
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

    public getUserFeeds(username: string): Observable<TUserDetails['feeds']> {
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

    public getUserInfo(username: string): Observable<TUserDetails['user']> {
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

    public getUserAndUserFeeds(username: string): Observable<TUserDetails> {
        return forkJoin([
            this.getUserFeeds(username),
            this.getUserInfo(username)
        ]).pipe(
            map(([userFeedsData, userInfo]): { feeds: TUserDetails['feeds'], user: TUserDetails['user']} => {
                return { feeds: userFeedsData , user: userInfo.user_profile };
            })
        );
    }
}

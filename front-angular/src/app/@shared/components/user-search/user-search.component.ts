import { Component, OnDestroy } from '@angular/core';
import { AsyncSubject, BehaviorSubject, takeUntil, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Api } from "../../../@core/enums/api";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnDestroy {
  public selectedUser$ = new BehaviorSubject(null);
  public selectedUserFollowers = '';
  public isSelectedUser = false;
  public isVerified!: boolean;
  public destroy$ = new AsyncSubject();

  constructor(private httpClient: HttpClient) {}
  public selectUser(user: any) {
    this.isSelectedUser = true;
    this.selectedUserFollowers = user.followers;
    this.isVerified = user.is_verified

    this.getUser(user.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.selectedUser$.next(response);
    })
  }

  public getUser(userName: string) {
    const url = `${Api.getUsers}${ userName }`;
    return this.httpClient.get<any>(url).pipe(
      tap(response => console.log(response)),
    )
  }

  public ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

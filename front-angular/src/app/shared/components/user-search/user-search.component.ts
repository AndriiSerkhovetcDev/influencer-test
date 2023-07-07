import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal, } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { TSearchedUser } from '../../../core/types/search-user.type';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { LoaderComponent } from '../loader/loader.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, UserProfileComponent, LoaderComponent],
})
export class UserSearchComponent {
  private readonly _userService: UserService = inject(UserService);

  protected readonly user: WritableSignal<TSearchedUser | null> = signal(null);

  private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  protected readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();

  protected selectUser(user: TSearchedUser): void {
    this._showLoader();
    this.user.set(user);
  }

  protected readonly selectedUser = computed(() => {
    const user = this.user();

    if (!user) return null;
    const { username, is_verified, followers } = user;

    return this._userService.getUser(username).pipe(
      map(({user: userDetails, feeds}) => {
        return {
          feeds,
          user: userDetails || {
            ...user,
            url: user.picture,
            contacts: []
          },
          is_verified,
          followers,
        };
      }),
      finalize(() => this._hideLoader())
    );
  });

  private _showLoader(): void {
    this._isLoading.next(true);
  }

  private _hideLoader(): void {
    this._isLoading.next(false);
  }
}

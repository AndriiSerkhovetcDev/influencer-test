import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { TSearchedUser } from '@core/types/search-user.type';
import { map } from 'rxjs';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, UserProfileComponent]
})
export class UserSearchComponent {
  private readonly _userService: UserService = inject(UserService);

  protected readonly user: WritableSignal<TSearchedUser | null> = signal(null);
  protected readonly selectedUser = computed(() => {
    const user = this.user();

    if (!user) return null;
    const { username, is_verified, followers } = user;

    return this._userService.getUser(username)
               .pipe(map(userDetails => ({
                 ...userDetails,
                 is_verified,
                 followers
               })));
  });
}

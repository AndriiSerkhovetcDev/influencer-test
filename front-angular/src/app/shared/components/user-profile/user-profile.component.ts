import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TUserDetails } from '@core/types/user-details.type';
import { ShortFormatPipe } from '@shared/pipes/short-format.pipe';
import {CorsInterceptor} from "@core/interseptor/cors.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ShortFormatPipe],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    },
  ]
})
export class UserProfileComponent {
  @Input() set user(value: TUserDetails) {
    if (!value) return;

    const { user, feeds } = value;
    this.userInfo = user;
    this.userFeeds = feeds?.items;
  };

  @Input() selectedUserFollowers: string = '';
  @Input() isVerified: boolean = false;

  protected userInfo: TUserDetails['user'] | null = null;
  protected userFeeds: TUserDetails['feeds']['items'] = [];
}

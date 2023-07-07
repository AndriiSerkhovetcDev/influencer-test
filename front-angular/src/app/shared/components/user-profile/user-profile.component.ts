import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ShortFormatPipe } from "../../pipes/short-format.pipe";
import { TUserDetails } from "../../../core/types/user-details.type";
import { FetchImagePipe } from "../../pipes/fetch-image.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faClapperboard,
  faHeart,
  faComment,
  faImages,
} from "@fortawesome/free-solid-svg-icons";
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ShortFormatPipe, FetchImagePipe, FontAwesomeModule, LoaderComponent],
})
export class UserProfileComponent {
  @Input() set user(value: TUserDetails) {
    if (!value) return;

    const { user, feeds } = value;
    this.userInfo = user;
    this.userFeeds = feeds?.items;
  }

  @Input() selectedUserFollowers = "";
  @Input() isVerified = false;

  protected userInfo: TUserDetails["user"] | null = null;
  protected userFeeds: TUserDetails["feeds"]["items"] = [];


  protected readonly faClapperboard = faClapperboard;
  protected readonly faHeart = faHeart;
  protected readonly faComment = faComment;
  protected readonly faImages = faImages;
}

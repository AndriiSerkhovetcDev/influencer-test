import { TPagedResponse } from "./page-response.type";
import { TFeedItem } from "./feed-item.type";
import { TProfileUserContact } from "./profile-user-contact.type";

export type TUserDetails = {
  feeds: TPagedResponse<TFeedItem>;
  user: TProfileUserContact;
  user_profile?: TProfileUserContact;
};

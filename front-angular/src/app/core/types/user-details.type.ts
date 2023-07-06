import { TFeedItem } from '@core/types/feed-item.type';
import { TPagedResponse } from '@core/types/page-response.type';
import { TProfileUserContact } from '@core/types/profile-user-contact.type';

export type TUserDetails = {
  feeds: TPagedResponse<TFeedItem>;
  user: TProfileUserContact;
};

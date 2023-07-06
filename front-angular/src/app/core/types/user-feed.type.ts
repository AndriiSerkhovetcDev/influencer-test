import { TFeedItem } from '@core/types/feed-item.type';

export type TUserFeed = {
  items: Readonly<TFeedItem[]>;
  more_available: boolean;
  end_cursor: string;
  status: string;
};

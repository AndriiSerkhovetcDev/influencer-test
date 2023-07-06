import { TFeedItem } from "./feed-item.type";

export type TUserFeed = {
  items: Readonly<TFeedItem[]>;
  more_available: boolean;
  end_cursor: string;
  status: string;
};

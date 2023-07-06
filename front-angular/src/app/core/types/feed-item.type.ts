import { TCandidate } from '@core/types/candidate.type';
import { TClipsMetadata } from '@core/types/clips-meta-data.type';
import { TCoauthorProducer } from '@core/types/coauthor-producer.type';
import { TPosition } from '@core/types/position.type';
import { TUser } from '@core/types/user.type';

export type TFeedItem = {
  pk: number;
  display_url: string;
  image_versions2: TImageVersions2;
  has_audio: boolean;
  is_dash_eligible: string;
  video_dash_manifest: string;
  number_of_qualities: number;
  video_url: string;
  taken_at: number;
  code: string;
  comment_count: number;
  like_count: number;
  view_count: number;
  play_count: number;
  like_and_view_counts_disabled: boolean;
  media_type: number;
  video_duration: number;
  caption: TCaption;
  title: string;
  user: TUser;
  coauthor_producers: TCoauthorProducer[];
  location: Location;
  product_type: string;
  can_viewer_reshare: boolean;
  usertags: { in: TPosition[] };
  sponsor_tags: { sponsor: TUser }[];
  carousel_media_count: number;
  carousel_media: Partial<TFeedItem[]>;
  clips_metadata: TClipsMetadata;
};

type TImageVersions2 = {
  candidates: TCandidate[];
};


type TCaption = {
  text: string;
};

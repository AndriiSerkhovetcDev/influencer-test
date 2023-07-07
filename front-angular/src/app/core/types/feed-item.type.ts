import {TCoauthorProducer} from "./coauthor-producer.type";
import {TUser} from "./user.type";
import {TPosition} from "./position.type";
import {TClipsMetadata} from "./clips-meta-data.type";
import {TCandidate} from "./candidate.type";


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

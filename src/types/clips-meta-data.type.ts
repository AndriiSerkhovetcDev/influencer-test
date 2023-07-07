export type TClipsMetadata = {
  music_info: TMusicInfo;
};

type TMusicAssetInfo = Record<
  "audio_cluster_id" | "id" | "title" | "subtitle" | "display_artist",
  string
>;

type TMusicInfo = {
  music_asset_info: TMusicAssetInfo;
};

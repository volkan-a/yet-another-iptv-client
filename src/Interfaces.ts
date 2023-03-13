export interface Category {
  category_id: number;
  category_name: string;
}

export interface Stream {
  num: number;
  name: string;
  stream_type: string;
  stream_id: string;
  stream_icon: string;
  category_id: number;
}
export enum Actions {
  getLiveCategories = "get_live_categories",
  getLiveStreams = "get_live_streams",
  getVodCategories = "get_vod_categories",
  getVodStreams = "get_vod_streams",
  getSeriesCategories = "get_series_categories",
  getSeriesStreams = "get_series",
  getSeriesInfo = "get_series_info",
  getSeriesEpisodes = "get_series_episodes",
  getMovieInfo = "get_movie_info",
  getContainerInfo = "get_container_info",
  getContainerContents = "get_container_contents",
  getLiveStreamsByCategoryID = "get_live_streams_by_category_id",
  getVodStreamsByCategoryID = "get_vod_streams_by_category_id",
  getSeriesStreamsByCategoryID = "get_series_streams_by_category_id",
}

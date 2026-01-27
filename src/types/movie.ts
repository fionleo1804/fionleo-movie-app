export interface Genre {
  id: number;
  name: string;
}

export interface ReleaseDate {
  certification: string;
  type?: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  overview: string;
  genres?: Genre[];
  original_language: string;
  runtime?: number;
  release_dates?: {
    results: ReleaseDateResult[];
  };
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}
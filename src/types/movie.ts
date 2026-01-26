export interface Movie {
  id: number;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  overview: string;
  genres: { id: number; name: string }[];
  original_language: string;
  runtime: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}
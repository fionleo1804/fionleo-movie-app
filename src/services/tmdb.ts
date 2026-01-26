const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

export const TMDB_API = {
  API_KEY,
  BASE_URL,
  
  fetchMovies: (page: number, sortBy: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    return `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}&primary_release_date.lte=${today}`;
  },

  fetchDetails: (id: string) => 
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`,
    
  imageUrl: (path: string | null) => 
    path 
      ? `${IMAGE_BASE}${path}` 
      : '/images/placeholder/no-poster.svg' 
};
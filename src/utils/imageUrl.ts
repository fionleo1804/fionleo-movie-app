const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const imageUrl = (path: string | null) =>
  path ? `${IMAGE_BASE}${path}` : "/images/placeholder/no-poster.svg";

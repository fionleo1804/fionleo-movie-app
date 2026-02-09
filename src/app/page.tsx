"use client";

import { useEffect, useState, useCallback } from "react";
import { TMDB_API } from "@/api/tmdb";
import { Movie } from "@/types/movie";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "@/components/MovieCard";
import { useMovieContext } from "@/context/MovieContext";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const { sortBy, setSortBy } = useMovieContext();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchMovies = useCallback(async (pageNum: number, isRefresh = false) => {
    if (pageNum === 1) {
      setLoading(true);
    }

    try {
      const res = await fetch(TMDB_API.fetchMovies(pageNum, sortBy));
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      
      const data = await res.json();
      const newResults = data?.results || [];

      setMovies(prev => (isRefresh ? newResults : [...prev, ...newResults]));
      setPage(pageNum);
      setHasMore(pageNum < (data?.total_pages || 0));
    } catch {
      // console.error("Fetch Error:", _e); 
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  const isMobile = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    setMounted(true);
    fetchMovies(1, true);
  }, [fetchMovies])

  if (!mounted) {
    return <div className="min-h-screen bg-white" />; 
  }

  return (
    <main className="container mx-auto px-4 py-8 relative min-h-screen">
      <div
        data-testid="loading-bar"
        className={`fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all ${
          loading ? "w-full opacity-100 animate-pulse" : "w-0 opacity-0"
        }`}
      />

      <div className="flex flex-col xl:flex-row justify-between items-center gap-5 mb-6">
        <div>
          <h1 className="text-4xl font-black text-white-900 tracking-tight">
            Discover Movies
          </h1>
          <p className="text-white-600 text-sm mt-1 font-medium">
            Browsing all movies to the most recent date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="text-sm font-bold uppercase text-white-500"
          >
            Sort By:
          </label>
          <select
            id="sort-select"
            className="border-2 border-gray-100 p-2 rounded-xl bg-white text-black font-bold focus:outline-none cursor-pointer transition-all"
            value={sortBy}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="primary_release_date.desc">Latest Release</option>
            <option value="primary_release_date.asc">Oldest Release</option>
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Highest Rated</option>
          </select>
        </div>
      </div>

      {movies.length > 0 ? (
        <InfiniteScroll
          dataLength={movies.length}
          next={() => fetchMovies(page + 1)}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center p-10">
              <div data-testid="loading-refresh" className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          }
          pullDownToRefresh={isMobile}
          pullDownToRefreshThreshold={70}
          pullDownToRefreshContent={
            <h3 className="text-center text-white-400 text-sm py-2">
              ⇣ Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center text-white-600 text-sm py-2">
              ⇡ Release to refresh
            </h3>
          }
          refreshFunction={() => fetchMovies(1, true)}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((m, i) => (
              <MovieCard key={`${m.id}-${i}`} movie={m} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              data-testid="movie-skeleton"
              className="aspect-[2/3] bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
    </main>
  );
}
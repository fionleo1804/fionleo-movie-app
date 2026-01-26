"use client";

import { TMDB_API } from '@/services/tmdb';
import { Movie } from '@/types/movie';
import Image from "next/image";
import Link from 'next/link';
import SafeImage from './SafeImage';

export default function MovieCard({ movie }: { movie: Movie }) {
  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    window.open("https://www.google.com", "_blank");
  };

  const formattedDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-GB', {
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
      })
    : 'TBA';

  return (
    <Link href={`/movie/${movie.id}`} className="group relative block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
          <SafeImage 
            src={TMDB_API.imageUrl(movie.poster_path)} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button 
            onClick={handleBookClick}
            className="hidden xl:block absolute bottom-4 left-4 right-4 bg-blue-600 text-white text-[10px] font-bold py-2 rounded-lg 
                       shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                       transition-all duration-300 hover:bg-blue-700 active:scale-95 z-10"
          >
            BOOK NOW
          </button>
        </div>

        <div className="p-3">
          <h3 className="font-bold text-xl truncate text-black mb-1">{movie.title}</h3>
          
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center text-base text-gray-500 font-medium gap-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-black">
                <Image
                  src="/images/icons/popular.svg"
                  width={16}
                  height={16}
                  alt="popular"
                />
                {movie.popularity ?Math.round(movie.popularity) : "0"}
              </span>
              <span className="flex items-center gap-1 text-black">
                <Image
                  src="/images/icons/star.svg"
                  width={16}
                  height={16}
                  alt="star"
                />
                {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
              </span>
            </div>
            
            <span className="flex items-center gap-1 text-black">
                <Image
                  src="/images/icons/calendar.svg"
                  width={16}
                  height={16}
                  alt="calendar"
                />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
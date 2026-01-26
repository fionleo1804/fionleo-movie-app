import { TMDB_API } from "@/services/tmdb";
import Image from "next/image";
import SafeImage from "@/components/SafeImage";

interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: { certification: string }[];
}

interface Genre {
  id: number;
  name: string;
}

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(
    `${TMDB_API.fetchDetails(id)}&append_to_response=release_dates`, 
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) {
    return <div className="p-10 text-center">Movie not found</div>;
  }
  const movie = await res.json();

  const hasDifferentTitle = movie.original_title && movie.original_title !== movie.title;

  const certification = movie.release_dates?.results
    ?.find((r: ReleaseDateResult) => r.iso_3166_1 === "US")
    ?.release_dates?.[0]?.certification || "Not Rated";

  const formatLanguageCode = (code: string) => {
    if (!code) return "Unknown";

    try {
      const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
      return displayNames.of(code) || code.toUpperCase();
    } catch (_e) {
      return code.toUpperCase();
    }
  };

  const formattedDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-GB', {
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
      })
    : 'To be announce';

  return (
    <div className="max-w-4xl mx-auto p-6">      
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
        <SafeImage 
          src={TMDB_API.imageUrl(movie.backdrop_path || movie.poster_path)} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-10">
        <header className="mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-white-900 tracking-tight">{movie.original_title}</h1>
          {hasDifferentTitle && (
            <h2 className="text-xl md:text-2xl text-white-600 font-semibold mt-2">{movie.title}</h2>
          )}
        </header>

        <div className="flex items-center gap-4 mb-8 text-sm text-white-500 font-medium">
          <span className="flex items-center gap-1">
             <Image
              src="/images/icons/calendar.svg"
              width={16}
              height={16}
              alt="calendar"
            />
            {formattedDate}
          </span>
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex items-center gap-4">
              <span>•</span>
              <div className="flex gap-2">
                {movie.genres.slice(0, 3).map((g: any) => (
                  <span
                    key={g.id}
                    className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase text-black tracking-wider"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 py-8 border-y border-gray-100">
          <div className="flex flex-col items-center text-center">
            <Image 
              src="/images/icons/star.svg" 
              width={24} 
              height={24} 
              className="mb-2 text-yellow-500" 
              alt="Rating Icon" 
            />
            <p className="text-[10px] text-white-400 uppercase tracking-widest mb-1">Rating</p>
            <p className="font-bold text-white-800">{movie.vote_average?.toFixed(1)}</p>
          </div>

          <div className="flex flex-col items-center text-center border-l md:border-x border-gray-100">
            <Image 
              src="/images/icons/clock.svg" 
              width={24} 
              height={24} 
              className="mb-2" 
              alt="Duration Icon" 
            />
            <p className="text-[10px] text-white-400 uppercase tracking-widest mb-1">Duration</p>
            <p className="font-bold text-white-800">
              {movie.runtime ? `${movie.runtime} min` : 'TBA'}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Image 
              src="/images/icons/globe.svg" 
              width={24} 
              height={24} 
              className="mb-2" 
              alt="Language Icon" 
            />
            <p className="text-[10px] text-white-400 uppercase tracking-widest mb-1">Language</p>
            <p className="font-bold text-white-800">{formatLanguageCode(movie.original_language)}</p>
          </div>

          <div className="flex flex-col items-center text-center border-l border-gray-100">
            <div className="w-6 h-6 mb-2 flex items-center justify-center">
               <span className="text-[10px] font-black border-2 border-gray-500 px-1 rounded-sm">18+</span>
            </div>
            <p className="text-[10px] text-white-400 uppercase tracking-widest mb-1">Age Rating</p>
            <p className="font-bold text-white-800">{certification}</p>
          </div>
        </div>

        <section className="mb-12">
          <h3 className="text-xl font-bold mb-4 text-white-900">Synopsis</h3>
          <p className="text-white-600 leading-relaxed text-lg">
            {movie.overview || "To be announced."}
          </p>
        </section>
        
        <a 
          href="https://www.google.com" 
          target="_blank"
          className="block w-full bg-blue-600 text-white text-center py-5 rounded-2xl font-black text-xl 
                     hover:bg-blue-700 transition-all shadow-xl active:scale-[0.98]"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
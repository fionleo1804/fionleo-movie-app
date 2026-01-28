import { TMDB_API } from "@/api/tmdb";
import Image from "next/image";
import Link from 'next/link';
import SafeImage from "@/components/SafeImage";
import { Genre, Movie, ReleaseDateResult } from "@/types/movie";

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  
  const res = await fetch(
      `${TMDB_API.fetchDetails(id)}&append_to_response=release_dates`, 
      { 
        next: { revalidate: 3600 },
        signal: controller.signal 
      }
    );
  clearTimeout(timeoutId);
  
  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold text-white-400">Movie not found</h1>
        <p className="text-gray-500">The movie you are looking for doesn&apos;t exist or was removed.</p>
        <Link 
          href="/" 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }
  const rawMovie = await res.json();
  const movie: Movie & { release_dates: { results: ReleaseDateResult[] } } = {
      id: rawMovie.id,
      title: rawMovie.title,
      original_title: rawMovie.original_title,
      poster_path: rawMovie.poster_path,
      backdrop_path: rawMovie.backdrop_path,
      release_date: rawMovie.release_date,
      vote_average: rawMovie.vote_average,
      popularity: rawMovie.popularity,
      overview: rawMovie.overview,
      genres: rawMovie.genres,
      original_language: rawMovie.original_language,
      runtime: rawMovie.runtime,
      release_dates: rawMovie.release_dates // Kept for the Waterfall logic
    };

  const hasDifferentTitle = movie.original_title && movie.original_title !== movie.title;

  const getGlobalCertification = () => {
    const results: ReleaseDateResult[] = movie.release_dates?.results || [];
    const myEntry = results.find((r) => r.iso_3166_1 === "MY");
    const myCert = myEntry?.release_dates.find(d => d.certification !== "")?.certification;
    if (myCert) {
      return myCert;
    }

    const usEntry = results.find((r) => r.iso_3166_1 === "US");
    const usCert = usEntry?.release_dates.find(d => d.certification !== "")?.certification;
    if (usCert) {
      return usCert;
    }

    const fallback = results.find(r => r.release_dates.some(d => d.certification !== ""));
    return fallback?.release_dates.find(d => d.certification !== "")?.certification || "NR";
  };
  const certification  = getGlobalCertification();
  const certStyles     = getCertificationStyles(certification);

  const formatLanguageCode = (code: string) => {
    if (!code) {
      return "Unknown";
    }

    try {
      const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
      return displayNames.of(code) || code.toUpperCase();
    } catch {
      return code.toUpperCase();
    }
  };

  const formattedDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-GB', {
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
      })
    : 'To be announced';

  return (
    <div className="max-w-4xl mx-auto p-6">      
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
        <SafeImage 
          src={TMDB_API.imageUrl(movie.backdrop_path || movie.poster_path)} 
          alt={movie.title}
          fallbackSrc={'/images/placeholder/no-poster.svg'}
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
                {movie.genres.slice(0, 3).map((g: Genre) => (
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

          <div className="flex flex-col items-center text-center border-l border-white-800">
            <div className="h-6 mb-2 flex items-center justify-center">
              <span className="text-[9px] font-black border border-white-500 px-1.5 py-0.5 rounded text-white">
                {certification.includes('(') ? 'INTL' : 'LOCAL'}
              </span>
            </div>
            <p className="text-[10px] text-white uppercase tracking-widest mb-1">Age Rating</p>
            <p className={`font-bold text-white text-base md:text-lg ${certStyles}`}>{certification}</p>
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

const getCertificationStyles = (cert: string) => {
  const c = cert.toUpperCase();
  
  if (c.includes('18')) {
    return 'border-red-500 text-red-500 bg-red-500/10';
  }
  
  if (c.includes('13') || c.includes('16') || c === 'R' || c === 'PG-13') {
    return 'border-yellow-500 text-yellow-500 bg-yellow-500/10';
  }
  
  if (c === 'U' || c === 'P' || c === 'G' || c === 'PG') {
    return 'border-green-500 text-green-500 bg-green-500/10';
  }
  
  return 'border-gray-500 text-gray-400 bg-gray-500/10';
};
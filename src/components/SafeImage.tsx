"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined;
  fallbackSrc: string;
}

const SafeImage = ({ src, alt, fallbackSrc, className, ...props }: SafeImageProps) => {
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const [prevSrc, setPrevSrc] = useState(src);
  if (src !== prevSrc) {
    setPrevSrc(src);
    setErrorSrc(null);
  }

  const displaySrc = errorSrc ? fallbackSrc : (src || fallbackSrc);

  return (
    <Image
      {...props}
      src={displaySrc}
      alt={alt || "Movie poster"}
      className={className}
      onError={() => setErrorSrc(fallbackSrc)}
      unoptimized={src?.includes('tmdb.org')} 
    />
  );
};

export default SafeImage;
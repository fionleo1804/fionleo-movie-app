"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface MovieContextType {
  sortBy: string;
  setSortBy: (val: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export function MovieProvider({ children }: { children: ReactNode }) {
  const [sortBy, setSortBy] = useState("release_date.desc");

  return (
    <MovieContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  
  if (!context) {
    throw new Error("useMovieContext must be used within MovieProvider");
  }

  return context;
};
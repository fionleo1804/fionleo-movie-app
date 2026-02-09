import { render, screen, fireEvent, act } from "@testing-library/react";
import { jest, describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import HomePage from "../app/page";
import { Movie, MovieResponse } from "@/types/movie";
import { MovieProvider } from "@/context/MovieContext";

jest.mock("@/utils/imageUrl", () => ({
  imageUrl: (path: string) => path ? `https://image.tmdb.org/t/p/w500${path}` : "/images/placeholder/no-poster.svg",
}));

const mockMoviesResponse: MovieResponse = {
  results: [
    {
      id: 1603260,
      title: "Artemis 2 - Zurück zum Mond",
      original_title: "Artemis 2 - Zurück zum Mond",
      poster_path: "/images/placeholder/no-poster.svg",
      backdrop_path: "/images/placeholder/no-poster.svg",
      release_date: "2026-01-26",
      vote_average: 0.0,
      popularity: 0,
      overview: "",
      genres: [{id: 0, name: ""}],
      original_language: "ge",
      runtime: 0,
    } as Movie,
    {
      id: 1518058,
      title: "biarkan aku ganti",
      original_title: "biarkan aku ganti",
      poster_path: "cRZkQ6CdBsUxwLxYCm2HHAM6EUQ.jpg",
      backdrop_path: "/images/placeholder/no-poster.svg",
      release_date: "2026-01-26",
      vote_average: 0.0,
      popularity: 0,
      overview: "",
      genres: [{id: 16, name: "Horror"}],
      original_language: "en",
      runtime: 79,
    } as Movie,
  ],
  total_pages: 1,
};

const mockFetchMoviesFn = jest.fn(() => 
  Promise.resolve(mockMoviesResponse)
);

describe("HomePage", () => {
  beforeEach(() => {
    global.fetch = jest.fn((() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMoviesResponse),
      } as Response)
    ) as typeof fetch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders movies from API", async () => {
    render(
      <MovieProvider>
        <HomePage />
      </MovieProvider>
    );

    for (const movie of mockMoviesResponse.results) {
      expect(await screen.findByText(movie.title)).toBeInTheDocument();
    }
  });

  it("calls fetch with correct URL when sort changes", async () => {
    render(
      <MovieProvider>
        <HomePage />
      </MovieProvider>
    );

    const dropdown = screen.getByLabelText(/sort by/i);

    await act(async () => {
      fireEvent.change(dropdown, { target: { value: "vote_average.desc" } });
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const lastCallUrl = (global.fetch as jest.Mock).mock.calls[1][0] as string;
    expect(lastCallUrl).toContain("vote_average.desc");
  });

  it("renders loader during initial fetch", async () => {
    render(
      <MovieProvider>
        <HomePage />
      </MovieProvider>
    );

    const skeletons = screen.getAllByTestId("movie-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);

    for (const movie of mockMoviesResponse.results) {
      expect(await screen.findByText(movie.title)).toBeInTheDocument();
    }
  });
});

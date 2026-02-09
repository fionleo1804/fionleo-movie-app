import { render, screen, fireEvent } from "@testing-library/react";
import { jest, describe, it, expect } from '@jest/globals';
import "@testing-library/jest-dom/jest-globals";
import MovieDetailPage from "@/app/movie/[id]/page";
import { Movie } from "@/types/movie";

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("@/api/tmdb", () => ({
  TMDB_API: {
    fetchDetails: (id: string) => `https://api.themoviedb.org/3/movie/${id}`,
    imageUrl: (path: string) => path ? `https://image.tmdb.org/t/p/w500${path}` : "/images/placeholder/no-image.svg",
  },
}));

const mockedFetch = jest.fn() as jest.MockedFunction<typeof window.fetch>;
global.fetch = mockedFetch;

const openMock = jest.fn() as jest.MockedFunction<typeof window.open>;
Object.defineProperty(window, 'open', { value: openMock });

const mockDetailData = {
  id: 1,
  title: "",
  original_title: "biarkan aku ganti",
  poster_path: "hubIvG6AEtvU0vQyHmH86rVvPoM.jpg",
  backdrop_path: "hubIvG6AEtvU0vQyHmH86rVvPoM.jpg",
  release_date: "2026-01-26",
  vote_average: 0.0,
  popularity: 0,
  overview: "a woman experiences the same day...but is it a time loop?",
  genres: [{ id: 1, name: "Horror" }],
  original_language: "en",
  runtime: 79,
} as unknown as Movie; 

describe("Movie Detail Page", () => {
  it("renders detail content correctly", async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockDetailData,
    } as Response);

    const params = Promise.resolve({ id: "1" });
    const pageElement = await MovieDetailPage({ params });
    render(pageElement);

    const heading = screen.getByRole("heading", { level: 1, name: /biarkan aku ganti/i });

    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Horror/i)).toBeInTheDocument();
    expect(screen.getByText(/a woman experiences the same day/i)).toBeInTheDocument();
  });

  it("triggers the booking link", async () => {
    const params = Promise.resolve({ id: "1" });
    const pageElement = await MovieDetailPage({ params });
    render(pageElement);
    const bookLink = screen.getByRole("link", { name: /Book Now/i });
    fireEvent.click(bookLink);
    expect(bookLink).toHaveAttribute("href", "https://www.google.com");
    expect(bookLink).toHaveAttribute("target", "_blank");
  });
});
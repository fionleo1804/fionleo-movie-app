import { TMDB_API } from "@/api/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const sortBy = searchParams.get("sortBy") || "release_date.desc";

  try {
    const url = TMDB_API.fetchMovies(parseInt(page), sortBy);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}

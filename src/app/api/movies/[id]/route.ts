import { TMDB_API } from "@/api/tmdb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = TMDB_API.fetchDetails(id) + "&append_to_response=release_dates";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { error: "Failed to fetch movie details" },
      { status: 500 }
    );
  }
}

import axios from "axios";
import { Request } from "express";

export const getTrending = async () => {
  try {
    const { data }: any = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day",
      {
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
      }
    );

    return data.results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const querySearch = async (req: Request) => {
  const { q } = req.query;

  try {
    const { data }: any = await axios.get(
      "https://api.themoviedb.org/3/search/multi",
      {
        headers: {
          Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`,
        },
        params: {
          query: q,
        },
      }
    );

    const moviesAndShows = data.results.filter((result: any) => {
      return result.media_type === "movie" || result.media_type === "tv";
    });

    return moviesAndShows;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

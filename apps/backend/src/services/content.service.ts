import axios from "axios";
import { Request } from "express";
import { getMediaURL } from "../utils";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.MOVIEDB_API_KEY}`;

export const getTrending = async () => {
  try {
    const { data }: any = await axios.get("/trending/all/day");

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
    const { data }: any = await axios.get("/search/multi", {
      params: {
        query: q,
      },
    });

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

export const getContentDetails = async (req: Request) => {
  const { id, type }: any = req.query;
  try {
    const { data }: any = await axios.get(`${getMediaURL(type)}/${id}`);

    return { ...data, media_type: type };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const getContentTrailer = async (req: Request) => {
  const { id, type }: any = req.query;
  try {
    const { data }: any = await axios.get(`${getMediaURL(type)}/${id}/videos`);
    const results = data.results.filter(
      (result: any) => result.site === "YouTube" && result.type === "Trailer"
    );

    return results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const getAiringToday = async () => {
  try {
    const { data }: any = await axios.get("tv/airing_today");

    return data.results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const getUpcoming = async () => {
  try {
    const { data }: any = await axios.get("movie/upcoming");

    return data.results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const getTopRatedMovies = async (req: Request) => {
  const { page = 1 } = req.query;

  try {
    const { data }: any = await axios.get("movie/top_rated", {
      params: {
        page,
      },
    });

    return data.results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

export const getTopRatedShows = async (req: Request) => {
  const { page = 1 } = req.query;

  try {
    const { data }: any = await axios.get("tv/top_rated", {
      params: {
        page,
      },
    });

    return data.results;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.status_message || "An internal error occurred"
    );
  }
};

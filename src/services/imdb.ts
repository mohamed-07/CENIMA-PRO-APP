import axios from "axios";
import type { Movie } from "../types";

const api = axios.create({
    baseURL: `https://imdb236.p.rapidapi.com/api/imdb`,
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RADIO_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
    }
})

export const getMostPopularMovies = async (): Promise<Movie[]> => {
    const response = await api.get('/most-popular-movies');
    console.log('date from getmostpopler movies function');
    console.log(response.data);
    return response.data;
}

export const getTop250Movies = async (): Promise<Movie[]> => {
  const res = await api.get('/top-250-movies')
  return res.data
}
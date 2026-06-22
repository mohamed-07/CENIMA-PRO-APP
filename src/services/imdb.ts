import axios from "axios";
import type { Movie ,MoviesResponse, TVShowResponse } from "../types";
// IMDB API
const api = axios.create({
    baseURL: `https://imdb236.p.rapidapi.com/api/imdb`,
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RADIO_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
    }
})
// TMDB API 
const tmdbApi = axios.create({
    baseURL: import.meta.env.VITE_TMDB_API_URL,
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY
    }
})


export const getMostPopularMovies = async (page = 4): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/popular', {
        params: {
                page
            },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_READ_ACCESS_TOKEN
        }
    });
    // console.log(response.data);
    return response.data;
}

export const getTop250Movies = async (): Promise<Movie[]> => {
    const res = await api.get('/top-250-movies')
    return res.data
}

export const getPopularTVShows = async (page = 2): Promise<TVShowResponse> => {
    const response = await tmdbApi.get('/tv/popular', {
        params: {
            page
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_READ_ACCESS_TOKEN
        }
    });
    return response.data
}
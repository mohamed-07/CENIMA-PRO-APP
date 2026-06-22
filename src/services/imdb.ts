import axios from "axios";
import type { Movie ,MoviesResponse, TvShowDetails, TVShowResponse } from "../types";
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
    },
    headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + import.meta.env.VITE_API_READ_ACCESS_TOKEN
        }
})


export const getMostPopularMovies = async (page: number): Promise<MoviesResponse> => {
    const response = await tmdbApi.get('/movie/popular', {
        params: {
                page
            },
    });
    // console.log(response.data);
    return response.data;
}

export const getTop250Movies = async (): Promise<Movie[]> => {
    const res = await api.get('/top-250-movies')
    return res.data
}

export const getPopularTVShows = async (page: number): Promise<TVShowResponse> => {
    const response = await tmdbApi.get('/tv/popular', {
        params: {
            page
        },
    });
    return response.data
}

export const getTvShowDetails = async (id: number,signal?: AbortSignal ): Promise<TvShowDetails> => {
    const response = await tmdbApi.get(`/tv/${id}`, { signal })
    return response.data
}

export const getSeasonDetails = async (id: number, seasonNumber: number, signal?: AbortSignal) => {
    const response = await tmdbApi.get(`/tv/${id}/season/${seasonNumber}`, { signal })
    return response.data
}
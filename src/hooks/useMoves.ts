import { useState, useEffect } from "react";
import { getMostPopularMovies } from "@/services/imdb";
import type { MoviesResponse } from "@/types";

export const useMovies = () => {
    const [moviesData, setMoviesData] = useState<MoviesResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(9);

    useEffect(() => { 
        getMostPopularMovies(page)
            .then(data => setMoviesData(data))
            .catch(() => setError('Failed to fetch movies'))
            .finally(() => setLoading(false))
    }, [page]);
    const nextPage = () => setPage(prev => prev + 1)
    const prevPage = () => setPage(prev => Math.max(1, prev - 1))
    return { moviesData, loading, error, nextPage, prevPage };
}
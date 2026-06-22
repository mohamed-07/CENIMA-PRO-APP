import { useState, useEffect } from "react";
import { getMostPopularMovies } from "@/services/imdb";
import type { Movie } from "@/types";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { 
        getMostPopularMovies()
            .then(data => setMovies(data))
            .catch(() => setError('Failed to fetch movies'))
            .finally(() => setLoading(false))
    }, []);
    return { movies, loading, error };
}
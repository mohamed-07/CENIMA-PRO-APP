import { useState, useEffect } from "react";
import { getTop250Movies } from "@/services/imdb";
import type { Movie } from "@/types";

export const useTopMovies = () => {
    const [topMovies, setTopMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTop250Movies()
            .then(data => setTopMovies(data))
            .catch(() => setError('Failed to fetch movies'))
            .finally(() => setLoading(false))
    }, []);
    return { topMovies, loading, error };
}
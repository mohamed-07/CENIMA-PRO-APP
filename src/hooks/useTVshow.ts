import { useState, useEffect } from "react";
import { getPopularTVShows } from "@/services/imdb";
import type { TVShowResponse } from "@/types";


export const useTvShow = () => {
    const [tvShowData, setTvShowData] = useState<TVShowResponse | null>(null)
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(3)

    useEffect(() => {
        getPopularTVShows(page)
            .then(data => setTvShowData(data))
            .catch(() => setError('Failed to fetch TV SHow'))
            .finally(() => setLoading(false))
    }, [page])

    const nextPage = () => setPage(prev => prev + 1)
    const prevPage = () => setPage(prev => Math.max(1, prev - 1))
    return { tvShowData, loading, error, nextPage, prevPage };
} 
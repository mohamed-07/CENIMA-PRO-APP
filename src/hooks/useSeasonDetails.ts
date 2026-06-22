import {useEffect, useState} from "react"
import { getSeasonDetails } from "@/services/imdb"
import type { SeasonDetails } from "@/types"

export function useSeasonDetails(id: number, seasonNumber: number) {
    const [season, setSeason] = useState<SeasonDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        if (!id || !seasonNumber) return
        const controller = new AbortController()

        const fetchSeasonDetails = async () => {    
            try {
                setLoading(true)
                setError(null) 
                const data = await getSeasonDetails(id, seasonNumber, controller.signal)
                // console.log("From useSeasonDetails:", data);
                setSeason(data)
            } catch (err: unknown) {
                if (
                    err instanceof Error && 
                    (err.name === "CanceledError" || err.name === "AbortError")
                ) return
                setError("Failed to load season details")
            } finally {
                setLoading(false)
            }   
        }

        fetchSeasonDetails()
        return () => controller.abort()
    }, [id, seasonNumber])

    return { season, loading, error }
}
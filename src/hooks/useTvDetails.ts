
import { useEffect, useState } from "react"
import { getTvShowDetails } from "@/services/imdb"
import type { TvShowDetails } from "@/types"

export function useTvDetails(id: number) {
    const [show, setShow] = useState<TvShowDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) return

        // ✅ ننشئ controller لإلغاء الـ request
        const controller = new AbortController()

        const fetchDetails = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await getTvShowDetails(id, controller.signal)
                setShow(data)
            } catch (err: unknown) {
                if (
                    err instanceof Error && 
                    (err.name === "CanceledError" || err.name === "AbortError")
                ) return
                setError("Failed to load TV show details")
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()

        // ✅ لما الـ component يتمسح أو الـ id يتغير — نلغي الـ request
        return () => controller.abort()
    }, [id])

    return { show, loading, error }
}
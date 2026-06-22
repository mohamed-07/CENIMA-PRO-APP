import type { TVShow } from "@/types"
// import { Card } from "./ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
    show: TVShow | null
}

export default function TvShowCard({ show }: Props) {
    if (!show) return <Skeleton className="h-5 w-25 rounded-full" />
    return (
        <div  key={show?.id} className="bg-white h-full rounded-lg shadow-md overflow-hidden hover:cursor-pointer">
            <img src={`https://image.tmdb.org/t/p/w500${show?.backdrop_path}`}
                    alt={show?.name}
                    className="w-full h-75 object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="font-semibold text-center">{show?.name}</h3>
            </div>
        </div>
    )
}

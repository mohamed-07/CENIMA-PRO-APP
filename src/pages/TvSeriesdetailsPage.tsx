import { useParams } from "react-router-dom"
import { useTvDetails } from "@/hooks/useTvDetails"
import { Skeleton } from "@/components/ui/skeleton"

export default function TvSeriesdetailsPage() {

const IMG_BASE = "https://image.tmdb.org/t/p"
const { id } = useParams<{ id: string }>()
const { show, loading, error } = useTvDetails(Number(id))
console.log("From TvSeriesdetailsPage:", id);
console.log("From TvSeriesdetailsPage:", show);
  
  return (
    <div>
      {loading && <Skeleton className="h-4 w-full" />}
      {error && <p className="text-red-500">{error}</p>}
      {show && (
        <div className="relative min-h-screen bg-background">
            {/* Backdrop */}
          <div className="absolute inset-0 h-[500px]">
                <img
                    src={`${IMG_BASE}/original${show.backdrop_path}`}
                    alt={show.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Poster */}
                    <div className="shrink-0">
                        <img
                            src={`${IMG_BASE}/w342${show.poster_path}`}
                            alt={show.name}
                            className="w-48 md:w-64 rounded-xl shadow-2xl ring-2 ring-primary/30"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-4 justify-end pb-2">

                        {/* Title */}
                        <div>
                            <h1 className="text-4xl font-bold text-white">{show.name}</h1>
                            {show.original_name !== show.name && (
                                <p className="text-gray-400 text-sm mt-1">{show.original_name}</p>
                            )}
                        </div>

                        {/* Tagline */}
                        {show.tagline && (
                            <p className="text-primary italic text-lg">"{show.tagline}"</p>
                        )}

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2">
                            {show.genres.map((g) => (
                                <span key={g.id} className="px-3 py-1 text-xs rounded-full border border-primary/50 text-primary">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                            <span>⭐ {show.vote_average.toFixed(1)} <span className="text-gray-500">({show.vote_count.toLocaleString()} votes)</span></span>
                            <span>📅 {show.first_air_date} → {show.last_air_date}</span>
                            <span>🌍 {show.origin_country.join(", ")}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${show.in_production ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {show.status}
                            </span>
                        </div>

                        {/* Overview */}
                        <p className="text-gray-300 max-w-2xl leading-relaxed">{show.overview}</p>

                        {/* Homepage */}
                        {show.homepage && (
                            <a href={show.homepage} target="_blank" rel="noreferrer"
                                className="w-fit px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/80 transition">
                                Official Website ↗
                            </a>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { label: "Seasons", value: show.number_of_seasons },
                        { label: "Episodes", value: show.number_of_episodes },
                        { label: "Type", value: show.type },
                        { label: "Language", value: show.original_language.toUpperCase() },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">{stat.label}</p>
                            <p className="text-white font-bold text-xl mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Created By */}
                {show.created_by.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-white mb-4">Created By</h2>
                        <div className="flex gap-4 flex-wrap">
                            {show.created_by.map((person) => (
                                <div key={person.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                                    {person.profile_path ? (
                                        <img src={`${IMG_BASE}/w45${person.profile_path}`} alt={person.name}
                                            className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                            {person.name[0]}
                                        </div>
                                    )}
                                    <p className="text-white text-sm font-medium">{person.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Last Episode */}
                {show.last_episode_to_air && (
                    <div className="mt-10">
                        <h2 className="text-xl font-bold text-white mb-4">Last Episode</h2>
                        <div className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur">
                            {show.last_episode_to_air.still_path && (
                                <img
                                    src={`${IMG_BASE}/w300${show.last_episode_to_air.still_path}`}
                                    alt={show.last_episode_to_air.name}
                                    className="w-40 rounded-lg object-cover shrink-0"
                                />
                            )}
                            <div className="flex flex-col gap-2">
                                <p className="text-primary text-sm">S{show.last_episode_to_air.season_number} E{show.last_episode_to_air.episode_number}</p>
                                <h3 className="text-white font-bold text-lg">{show.last_episode_to_air.name}</h3>
                                <p className="text-gray-400 text-sm">{show.last_episode_to_air.overview}</p>
                                <p className="text-gray-500 text-xs">⭐ {show.last_episode_to_air.vote_average} · {show.last_episode_to_air.air_date}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Seasons */}
                <div className="mt-10">
                    <h2 className="text-xl font-bold text-white mb-4">Seasons</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {show.seasons.map((season) => (
                            <div key={season.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:cursor-pointer hover:border-primary/50 transition">
                                <img
                                    src={season.poster_path ? `${IMG_BASE}/w185${season.poster_path}` : "/placeholder.jpg"}
                                    alt={season.name}
                                    className="w-full aspect-[2/3] object-cover"
                                />
                                <div className="p-2">
                                    <p className="text-white text-sm font-medium truncate">{season.name}</p>
                                    <p className="text-gray-400 text-xs">{season.episode_count} episodes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      )}
    </div>
  )
}

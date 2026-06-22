import { Skeleton } from "@/components/ui/skeleton";
import { useSeasonDetails } from "@/hooks/useSeasonDetails";
import { useParams, useNavigate } from "react-router-dom";
import type { Episode } from "@/types";

const IMG_BASE = "https://image.tmdb.org/t/p";

function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  const hasImage = !!episode.still_path;

  return (
    <div
      className="group flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 rounded-xl overflow-hidden
                 hover:border-primary/60 hover:bg-white/[0.08]
                 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(229,9,20,0.25)]
                 transition-all duration-300 ease-out cursor-pointer"
    >
      {/* Episode Thumbnail */}
      <div className="relative shrink-0 w-full sm:w-48 md:w-56 aspect-video sm:aspect-auto sm:h-auto overflow-hidden bg-white/5">
        {hasImage ? (
          <img
            src={`${IMG_BASE}/w300${episode.still_path}`}
            alt={episode.name}
            className="w-full h-full object-cover
                       transition-all duration-500 ease-out
                       group-hover:scale-110 group-hover:brightness-75"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center min-h-28">
            <span
              className="text-4xl opacity-20 transition-all duration-300
                         group-hover:opacity-60 group-hover:scale-125"
            >🎬</span>
          </div>
        )}

        {/* Play button overlay — fades in on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition-opacity duration-300"
        >
          <div
            className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm
                       flex items-center justify-center
                       scale-75 group-hover:scale-100
                       transition-transform duration-300 ease-out
                       shadow-[0_0_20px_rgba(229,9,20,0.6)]"
          >
            <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Episode number badge */}
        <div
          className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md
                     border border-white/10
                     transition-all duration-300
                     group-hover:border-primary/50 group-hover:bg-primary/80 group-hover:scale-105"
        >
          E{episode.episode_number}
        </div>

        {/* Rating badge */}
        {episode.vote_average > 0 && (
          <div
            className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-semibold px-2 py-1 rounded-md
                       flex items-center gap-1
                       transition-all duration-300
                       group-hover:bg-yellow-500/20 group-hover:border group-hover:border-yellow-500/40 group-hover:scale-105"
          >
            ⭐ {episode.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Episode Info */}
      <div className="flex flex-col justify-center gap-2 p-4 flex-1 min-w-0 transition-all duration-300">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-primary text-xs font-semibold uppercase tracking-wider
                       transition-all duration-300
                       group-hover:translate-x-1 group-hover:tracking-widest"
          >
            Episode {episode.episode_number}
          </span>
          {episode.air_date && (
            <span className="text-gray-500 text-xs">· {episode.air_date}</span>
          )}
          {episode.runtime && (
            <span className="text-gray-500 text-xs">· {episode.runtime} min</span>
          )}
          {episode.episode_type && episode.episode_type !== "standard" && (
            <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full border border-primary/30 capitalize">
              {episode.episode_type}
            </span>
          )}
        </div>

        <h3
          className="text-gray-200 font-semibold text-base leading-snug truncate
                     transition-colors duration-300
                     group-hover:text-white"
        >
          {episode.name}
        </h3>

        {episode.overview ? (
          <p
            className="text-gray-400 text-sm leading-relaxed line-clamp-2
                       transition-colors duration-300 group-hover:text-gray-300"
          >
            {episode.overview}
          </p>
        ) : (
          <p className="text-gray-600 text-sm italic">No overview available.</p>
        )}

        {/* Guest Stars */}
        {episode.guest_stars.length > 0 && (
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-gray-500 text-xs">Guest Stars:</span>
            {episode.guest_stars.slice(0, 4).map((star) => (
              <span
                key={star.credit_id}
                className="text-gray-300 text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
              >
                {star.name}
              </span>
            ))}
            {episode.guest_stars.length > 4 && (
              <span className="text-gray-500 text-xs">
                +{episode.guest_stars.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SeasonDetailsPage() {
  const { id, seasonNumber } = useParams<{ id: string; seasonNumber: string }>();
  const navigate = useNavigate();
  const { season, loading, error } = useSeasonDetails(Number(id), Number(seasonNumber));

  // Loading skeletons
  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-10 max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-6">
          <Skeleton className="h-64 w-44 rounded-xl shrink-0" />
          <div className="flex-1 space-y-3 pt-2">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="space-y-4 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-5xl">⚠️</p>
          <p className="text-red-400 font-semibold text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg hover:bg-primary/30 transition text-sm"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!season) return null;

  const episodeCount = season.episodes?.length ?? 0;

  return (
    <div className="relative min-h-screen bg-background">

      {/* Hero Backdrop (using first episode still or poster) */}
      <div className="absolute inset-x-0 top-0 h-80 pointer-events-none overflow-hidden">
        {season.poster_path ? (
          <img
            src={`${IMG_BASE}/original${season.poster_path}`}
            alt={season.name}
            className="w-full h-full object-cover object-top opacity-30 blur-sm scale-105"
          />
        ) : season.episodes?.[0]?.still_path ? (
          <img
            src={`${IMG_BASE}/original${season.episodes[0].still_path}`}
            alt={season.name}
            className="w-full h-full object-cover object-top opacity-25 blur-sm scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-background" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mb-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Show
        </button>

        {/* Season Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">

          {/* Poster */}
          {season.poster_path && (
            <div className="shrink-0 self-start">
              <img
                src={`${IMG_BASE}/w342${season.poster_path}`}
                alt={season.name}
                className="w-40 md:w-52 rounded-xl shadow-2xl ring-2 ring-primary/30 hover:ring-primary/60 transition-all duration-300"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-4 justify-end">
            {/* Season label */}
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Season {seasonNumber}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {season.name}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              {season.air_date && (
                <span className="flex items-center gap-1">
                  📅 {season.air_date}
                </span>
              )}
              <span className="flex items-center gap-1">
                🎬 {episodeCount} Episode{episodeCount !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Overview */}
            {season.overview && (
              <p className="text-gray-300 leading-relaxed max-w-2xl text-sm md:text-base">
                {season.overview}
              </p>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center min-w-20 backdrop-blur">
                <p className="text-gray-400 text-xs uppercase tracking-wider">Episodes</p>
                <p className="text-white font-bold text-xl mt-1">{episodeCount}</p>
              </div>
              {season.season_number !== undefined && (
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center min-w-20 backdrop-blur">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Season</p>
                  <p className="text-white font-bold text-xl mt-1">{season.season_number}</p>
                </div>
              )}
              {season.episodes && season.episodes.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center min-w-24 backdrop-blur">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Avg Rating</p>
                  <p className="text-white font-bold text-xl mt-1">
                    ⭐{" "}
                    {(
                      season.episodes
                        .filter((ep) => ep.vote_average > 0)
                        .reduce((acc, ep) => acc + ep.vote_average, 0) /
                        (season.episodes.filter((ep) => ep.vote_average > 0).length || 1)
                    ).toFixed(1)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">All Episodes</h2>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-sm">{episodeCount} total</span>
        </div>

        {/* Episodes List */}
        {season.episodes && season.episodes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {season.episodes.map((episode, index) => (
              <EpisodeCard key={episode.id} episode={episode} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-400">No episodes found for this season.</p>
          </div>
        )}
      </div>
    </div>
  );
}

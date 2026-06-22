import type { Movie } from '../types'

// مساعد لتحويل الدقائق → "2h 22m"
const formatRuntime = (mins: number) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}h ${m}m`
}

interface Props {
  movie: Movie
}

export const HeroBanner = ({ movie }: Props) => {
  return (
    <div className="relative h-[85vh] w-full">

      {/* الصورة الخلفية */}
      <img
        src={movie.primaryImage}
        alt={movie.primaryTitle}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

      {/* المحتوى */}
      <div className="absolute bottom-32 left-10 max-w-xl space-y-4">

        {/* Genre Badge */}
        <span className="text-xs font-bold tracking-widest text-white uppercase">
          {movie.genres?.[0] || 'Action'}
        </span>

        {/* العنوان */}
        <h1 className="text-5xl font-black text-white uppercase leading-tight">
          {movie.primaryTitle}
        </h1>

        {/* المعلومات */}
        <div className="flex items-center gap-3 text-sm text-white/80">
          <span className="text-green-400 font-bold">
            ⭐ {movie.averageRating}
          </span>
          <span>{movie.startYear}</span>
          <span className="border border-white/40 px-1 text-xs">
            {movie.contentRating}
          </span>
          <span>{formatRuntime(movie.runtimeMinutes)}</span>
        </div>

        {/* الوصف */}
        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        {/* الأزرار */}
        <div className="flex gap-3 pt-2">
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded transition">
            ▶ Play Now
          </button>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-3 rounded backdrop-blur transition">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  )
}
import { useMovies } from '../hooks/useMoves'
import { HeroBanner } from '../components/HeroBanner'
import { Spinner } from '@/components/ui/spinner'


const HomePage = () => {
  const { movies, loading, error } = useMovies()

  if (loading) return <Spinner className='size-8 text-primary mx-auto my-auto' />
  if (error)   return <p className="text-red-500 text-center">{error}</p>
  if (!movies.length) return null

  return (
    <main className="bg-black min-h-screen">
      {/* أول فيلم في الـ Hero */}
      <HeroBanner movie={movies[8]} />

      {/* باقي الأفلام راح تجي هنا لاحقاً */}
      {/* <MediaRow title="Trending Now" items={movies} /> */}
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
      {movies.map((movie) => (
        <div key={movie.id} className="cursor-pointer group">
          <img
            src={movie.primaryImage}
            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <h3 className="text-white text-sm mt-2">{movie.primaryTitle}</h3>
        </div>
      ))}
    </div>
    </main>
  )
}

export default HomePage


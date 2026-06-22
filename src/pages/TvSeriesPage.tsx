
import { useTvShow } from "@/hooks/useTVshow";
import { Spinner } from "@/components/ui/spinner";
import { CarouselDemo } from "@/components/CarouselDemo";


export default function TvShowsPage() {
  const { tvShowData, loading, error, nextPage, prevPage } = useTvShow();

  if (loading) return <Spinner className='size-8 text-primary mx-auto my-auto' />
  if (error) return <p className="text-red-500 text-center">{error}</p>
  console.log(tvShowData)
  return (
    <main className="">
      <CarouselDemo  tvShow={tvShowData}/>
    </main>
  )
}

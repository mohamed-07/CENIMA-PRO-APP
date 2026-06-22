import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious} from "@/components/ui/pagination"

import type { TVShowResponse } from "@/types"
import TvShowCard from "@/components/TvShowCard";
import { Link } from "react-router-dom";
type Props = {
  tvShow?: TVShowResponse | null
  nextPage: () => void
  prevPage: () => void
}

export default function TopTvShow({ tvShow, nextPage, prevPage }: Props) {
    return (
        <div className="px-8 mt-2">
            <h2 className="text-2xl font-bold mb-4 sm:text-center text-primary">
                Populer TV Show
            </h2>
            <div className="">
                <Carousel opts={{align: "start",}}
                            className="w-full py-4">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {tvShow?.results.slice(5, 20).map((show) => (
                            <CarouselItem onClick={() => console.log("Clicked on TV Show", show.id, show.name)}
                                        key={show.id} className=" pl-2 md:pl-4 basis-[75%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                    <Link to={`/tv/${show.id}`} className=" h-full p-1">
                                        <TvShowCard key={show.id} show={show} />
                                    </Link>
                            </CarouselItem>
                                ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex absolute text-stone-300 left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer " />
                    <CarouselNext className="hidden md:flex absolute text-stone-300 right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer"  />
                </Carousel>
                <Pagination className=" flex justify-center pb-4">
                    <PaginationContent className="flex items-center gap-3  p-2 rounded-md">
                        <PaginationItem className=" border-2 rounded-md border-primary/50">
                            <PaginationPrevious className="text-primary hover:text-white hover:bg-primary/50 rounded-md w-30"
                                href="#"
                                onClick={(e) => {
                                e.preventDefault()
                                prevPage()
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem className="border-2 rounded-md border-primary/50">
                            <PaginationNext className="text-primary hover:text-white hover:bg-primary/50 rounded-md w-30"
                                href="#"
                                onClick={(e) => {
                                e.preventDefault()
                                nextPage()
                                }}
                            />
                        </PaginationItem>
                </PaginationContent>
            </Pagination>
            </div>
        </div>
    )
}

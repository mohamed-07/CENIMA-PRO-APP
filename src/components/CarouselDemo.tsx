
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import type { TVShowResponse } from "@/types"

export function CarouselDemo({ tvShow }: { tvShow?: TVShowResponse | null }) {
    
    return (
        <div className="w-full md:h-[80vh] overflow-hidden">
            <Carousel
                opts={{loop: true, align: 'start'}}
                plugins={[Autoplay({delay: 6000,}),
                ]}
                className="w-full h-full ">
                <CarouselContent className="h-full">
                {tvShow?.results.slice(0, 5).map((show) => (
                    <CarouselItem key={show.id} className="h-full pl- hover:cursor-pointer">
                        <div className=" basis-full">
                            <div className="relative w-full  h-[50vh] md:h-[80vh]">
                                <img
                                    src={"https://image.tmdb.org/t/p/original" +show.backdrop_path}
                                    alt={show.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="relative inset-0 bg-black/50 md:bg-black/50" />
                                {/* Content */}
                                <div className="absolute bottom-20 left-10 text-white">
                                    <h3 className="text-white/75">⭐ <span className="text-green-500">{show.vote_average.toFixed(1)}</span> | {show.popularity.toFixed(0)} views</h3>
                                    <h1 className=" text-primary text-2xl md:text-5xl font-bold">
                                        {show.name}
                                    </h1> 
                                    <h3 className="text-white/75">Origin Country: {show.origin_country[0]} | {show.first_air_date}</h3>
                                    <p className="max-w-2xl mt-4 text-sm md:text-lg line-clamp-3">
                                        {show.overview}
                                    </p>
                                </div>
                                <div className=" absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4 items-center justify-center">
                                    <button className="bg-primary text-white md:text-xl px-4 py-2 rounded-md hover:bg-blue-600">
                                        Watch Trailer
                                    </button>
                                    <button className="ml-4 bg-white/70 text-black md:text-xl px-4 py-2 rounded-md hover:bg-white/30">
                                        Add to Watchlist
                                    </button>
                                </div>
                            </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent  >
            <CarouselPrevious className="hidden md:flex absolute text-stone-300 left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer"/>
            <CarouselNext className="hidden md:flex absolute text-stone-300 right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer" />
                </Carousel>
            </div>
    )
}
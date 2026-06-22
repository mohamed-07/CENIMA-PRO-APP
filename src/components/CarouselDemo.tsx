
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
        <div className="w-full h-[80vh] overflow-hidden">
            <Carousel
                opts={{loop: true, align: 'start'}}
                plugins={[Autoplay({delay: 6000,}),
                ]}
                className="w-full h-full ">
                <CarouselContent className="h-full">
                {tvShow?.results.slice(0, 5).map((show) => (
                    <CarouselItem key={show.id} className="h-full pl-0">
                        <div className=" basis-full">
                            <div className="relative w-full h-[80vh]">
                                <img
                                    src={
                                        "https://image.tmdb.org/t/p/original" +
                                        show.backdrop_path
                                    }
                                    alt={show.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50" />

                                {/* Content */}
                                <div className="absolute bottom-20 left-10 text-white">
                                    <h1 className="text-5xl font-bold">
                                        {show.name}
                                    </h1>
                                    <p className="max-w-2xl mt-4 text-lg line-clamp-3">
                                        {show.overview}
                                    </p>
                                </div>
                            </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent  >
            <CarouselPrevious className="absolute text-stone-500 left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer"/>
            <CarouselNext className="absolute text-stone-500 right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent hover:cursor-pointer" />
                </Carousel>
            </div>
    )
}
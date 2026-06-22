export interface Movie {
    poster_path: string
    title: string
    id: string
    primaryTitle: string
    description: string
    primaryImage: string
    averageRating: number
    runtimeMinutes: number
    startYear: number
    contentRating: string
    genres: string[]
    trailer: string
    spokenLanguages: string[]
    vote_average: number
    release_date: string
    popularity: number
}

export interface MoviesResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
    original_title: string
    vote_average: number
    release_date: string
    popularity: number
    poster_path: string
}

export interface TVShow {
    backdrop_path: string
    title: string
    id: string
    primaryTitle: string
    description: string
    primaryImage: string
    averageRating: number
    runtimeMinutes: number
    startYear: number
    contentRating: string
    genres: string[]
    trailer: string
    spokenLanguages: string[]
    name: string
    overview: string
}

export interface TVShowResponse {
    backdrop_path: string
    first_air_date: string
    page: number 
    results: TVShow[]
    total_pages: number
    total_results: number
}
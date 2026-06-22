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
    popularity: number
    vote_average: number
    first_air_date: string
    origin_country: string
    backdrop_path: string
    title: string
    id: number
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
    page: number 
    results: TVShow[]
    total_pages: number
    total_results: number
}

// types/index.ts
export type TvShowDetails = {
    id: number
    name: string
    original_name: string
    overview: string
    tagline: string
    poster_path: string
    backdrop_path: string
    first_air_date: string
    last_air_date: string
    vote_average: number
    vote_count: number
    popularity: number
    status: string
    type: string
    in_production: boolean
    number_of_seasons: number
    number_of_episodes: number
    homepage: string
    origin_country: string[]
    original_language: string
    genres: { id: number; name: string }[]
    created_by: { id: number; name: string; profile_path: string }[]
    networks: { id: number; name: string; logo_path: string }[]
    seasons: {
        id: number
        name: string
        season_number: number
        episode_count: number
        poster_path: string
        air_date: string
    }[]
    last_episode_to_air: {
        id: number
        name: string
        overview: string
        vote_average: number
        episode_number: number
        season_number: number
        air_date: string
        still_path: string
    } | null
}
// types/index.ts for season details
export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}
export interface CrewMember extends Person {
  department: string
  job: string
  credit_id: string
}
export interface GuestStar extends Person {
  character: string
  credit_id: string
  order: number
}
export interface Episode {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string | null
  vote_average: number
  vote_count: number

  crew: CrewMember[]
  guest_stars: GuestStar[]
}

export interface SeasonDetails {
  _id: string
  air_date: string
  episodes: Episode[]

  name?: string
  overview?: string
  id?: number
  poster_path?: string | null
  season_number?: number
}
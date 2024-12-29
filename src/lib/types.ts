export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  genres?: { id: number; name: string }[];
}

export interface RecommendedMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
}

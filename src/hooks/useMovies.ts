import { useState, useEffect } from 'react';
import { Movie } from '../lib/types';

export const useMovies = (page: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading };
};

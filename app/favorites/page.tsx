'use client';

import { useState, useEffect } from 'react';
import { Movie } from '../../src/lib/types';
import MovieCard from '../../components/MovieCard';
import { Loader2 } from 'lucide-react';

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setLoading(true);
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.length > 0) {
          const moviesData = await Promise.all(
            favorites.map(async (movieId: number) => {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
                },
              });
              const data = await response.json();
              return data;
            })
          );
          setMovies(moviesData);
        }
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
    <h1 className='text-2xl text-center p-3 text-white'>Favorites</h1>
      <div className="p-4 grid grid-cols-1 col-span-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-center text-white">No favorites found</p>
        )}
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useMovies } from '../src/hooks/useMovies';
import { Loader2 } from 'lucide-react';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import Image from 'next/image';
import { Favorite } from '@mui/icons-material';

export default function Hero() {
  const { movies, loading } = useMovies(1);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [loadingImage, setLoadingImage] = useState(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingImage(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setLoadingImage(false);
      }, 7000);
    }, 7000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];

  useEffect(() => {
    if (currentMovie) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((fav: number) => fav === currentMovie.id));
    }
  }, [currentMovie]);

  const toggleFavorite = () => {
    if (currentMovie) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let updatedFavorites;

      if (favorites.includes(currentMovie.id)) {
        updatedFavorites = favorites.filter((id: number) => id !== currentMovie.id);
      } else {
        updatedFavorites = [...favorites, currentMovie.id];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    }
  };

  const percentage = currentMovie?.vote_average * 10;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      {loadingImage && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
      <Image
        src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
        alt={currentMovie.title}
        layout="fill"
        objectFit="cover"
        priority
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020024] to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-white md:flex justify-between w-full md:flex-row sm:block">
        <div className="flex flex-col p-5 max-w-70 sm:pt-12">
          <h1 className="text-3xl font-bold">{currentMovie.title}</h1>
          <p className="mt-2 text-sm">{currentMovie.overview}</p>
        </div>
        <div className="mt-4 p-10 flex justify-center align-middle gap-5">
          <div onClick={toggleFavorite} className="cursor-pointer">
            {isFavorite ? (
              <Favorite sx={{ color: 'yellow' }} />
            ) : (
              <Favorite sx={{ color: 'white' }} />
            )}
          </div>
          <span className="text-xl">
            <CircularProgressWithLabel value={percentage} size={70} fontSize="1.5rem" />
          </span>
        </div>
      </div>
    </div>
  );
}

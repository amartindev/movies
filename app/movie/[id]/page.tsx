'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Movie, Video } from '../../../src/lib/types';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { Favorite } from '@mui/icons-material';
import { PlayArrow } from '@mui/icons-material';
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel";
import RecommendedMovies from '@/components/RecommendedMovies';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
  
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const movieData = await movieResponse.json();
        setMovie(movieData);
  
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const videoData = await videoResponse.json();
  
        const trailer = videoData.results.find((video: Video) => video.site === 'YouTube' && video.type === 'Trailer');
        if (trailer) {
          setTrailerId(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some((fav: number) => fav === movie.id));
    }
  }, [movie]);

  const toggleFavorite = () => {
    if (movie) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      let updatedFavorites;

      if (favorites.includes(movie.id)) {
        updatedFavorites = favorites.filter((id: number) => id !== movie.id);
      } else {
        updatedFavorites = [...favorites, movie.id];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    }
  };

  const percentage = movie?.vote_average ? movie.vote_average * 10 : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center text-white">Movie not found</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="relative w-full md:h-[520px]">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020024] to-[#02002449]"></div>
        <div className="flex flex-col md:flex-row gap-6 relative p-5">
          <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={280}
              height={200}
              className="rounded-lg"
            />
            {trailerId && (
              <button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerId}`, '_blank')}
                className="w-72 border-2 border-yellow-500 bg-yellow-500 text-black py-2 px-4 hover:bg-transparent hover:text-yellow-500 transition duration-200"
              >
                Official Trailer {' '}
                <PlayArrow/>
              </button>
            )}
          </div>
          <div className="w-full md:w-2/3 text-white gap-5">
            <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
            <p className="mb-2 text-xs">{movie.release_date}</p>
            <p className="text-lg mb-2">
              <strong>Overview: </strong>
              <br />
              {movie.overview}
            </p>
            <div className="mt-4 p-10 flex justify-between items-center gap-5">
              <span className="text-xl flex row gap-4 items-center">
                <CircularProgressWithLabel value={percentage} size={90} fontSize="1.9rem" />
                <p className="text-lg">
                  Users
                  <br />
                  Score
                </p>
              </span>
              <div onClick={toggleFavorite} className="cursor-pointer">
                {isFavorite ? (
                  <Favorite sx={{ color: 'yellow' }} />
                ) : (
                  <Favorite sx={{ color: 'white' }} />
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-7">
              {movie.genres?.map((genre, index) => (
                <button
                  key={index}
                  className="border-2 border-yellow-500 text-yellow-500 py-1 px-5 hover:bg-yellow-500 hover:text-white transition duration-200"
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RecommendedMovies />
    </div>
  );
}

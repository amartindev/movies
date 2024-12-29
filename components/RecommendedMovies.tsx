'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { RecommendedMovie } from '../src/lib/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RecommendedMovies() {
  const { id } = useParams();
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!id) return;

    const fetchRecommendedMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setRecommendedMovies(data.results);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!recommendedMovies.length) {
    return <div className="text-center text-white">No recommended movies found.</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold text-white mb-4">Recommended Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {recommendedMovies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
            <div className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-sm">{movie.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

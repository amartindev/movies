import { useState, useEffect } from 'react';
import { Movie } from '../src/lib/types';
import MovieCard from './MovieCard';
import { Loader2 } from 'lucide-react';

export default function Movies({
  query,
  category,
}: {
  query: string;
  category: number | null;
}) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = '';
        if (query) {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=en-US&page=${page}`;
        } else if (category) {
          url = `https://api.themoviedb.org/3/discover/movie?with_genres=${category}&language=en-US&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          },
        });
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, category, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 col-span-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex col-span-4 w-full justify-center mt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-gray-300 text-black rounded mr-2"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

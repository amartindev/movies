import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Movie } from "../src/lib/types";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { Favorite } from '@mui/icons-material';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some((fav: number) => fav === movie.id));
    }, [movie.id]);

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let updatedFavorites;

        if (favorites.includes(movie.id)) {
            updatedFavorites = favorites.filter((id: number) => id !== movie.id);
        } else {
            updatedFavorites = [...favorites, movie.id];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    const percentage = movie.vote_average * 10;

    return (
        <div className='bg-foreground text-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden w-45 h-80 cursor-pointer'>
                <Link href={`/movie/${movie.id}`} passHref>
                <div className='relative w-full h-56'>
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
                    </Link>
                <div className='p-3 pb-0'>
                    <h3 className='text-sm font-bold truncate' title={movie.title}>
                        {movie.title}
                    </h3>
                    <p className='text-White text-xxs mb-0'>{movie.release_date}</p>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col items-center col-span-1'>
                            <p className='text-xxs'>Rating</p>
                            <CircularProgressWithLabel value={percentage} size={30} fontSize='0.6rem'/>
                        </div>
                        <div className='flex flex-col items-center  col-span-1'>
                            <p className='text-xxs'>Favorites</p>
                            <div onClick={toggleFavorite} className="cursor-pointer">
                                {isFavorite ? (
                                    <Favorite sx={{ color: 'yellow' }} />
                                ) : (
                                    <Favorite sx={{ color: 'white' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default MovieCard;

import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useGetMovies from '../hook/useGetMovies';
import SkeletonColor from '../Skeleton/CardSkeleton';

const SlideImage = () => {
    const [value] = useState(5);
    const { loading, movies } = useGetMovies();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (loading || movies.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [loading, movies]);

    if (loading) {
        return <SkeletonColor />;
    }

    const currentMovie = movies[currentIndex] || {};

    return (
        <div className='relative w-full overflow-hidden' style={{ height: `calc(100vh - 150px)`, borderRadius: '10px' }}>
            <img
                src={currentMovie.SmallImage} 
                alt={currentMovie.movieTitle || ''}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} 
            />
            <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-4' style={{ zIndex: 2 }}>
                <div className='flex flex-row items-center gap-4'>
                    <h1 className='bg-black px-2 py-2 text-white'>P1</h1>
                    <h1 className='text-white'>Adventure</h1>
                    <h1 className='text-white'>Drama</h1>
                    <h1 className='text-white'>Thrill</h1>
                </div>
                <h1 className='py-4 text-white'>{currentMovie.movieTitle || ''}</h1>
                <p className='text-white'>{currentMovie.Description}</p>
                <div className='w-full flex flex-row py-4 gap-4 items-center'>
                    <Rating name="read-only" value={value} readOnly />
                    <i className='text-white'>4.5</i>
                    <p className='px-2 py-2 bg-amber-300 text-black' style={{ borderRadius: '4px' }}>BTHG</p>
                    <i className='text-white'>{currentMovie.Duration || ''}</i>
                </div>
                <div className='flex flex-row'>
                    <h2 className='text-red-600'>Genre: </h2>
                    <i className='text-white'>Drama</i>
                </div>
                <div className='py-4 items-center'>
                    <Button 
                        variant="contained"
                        sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                    >
                        Stream <PlayArrowIcon />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SlideImage;

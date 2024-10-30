import React from 'react'
import useGetMovies from '../hook/useGetMovies'
import SkeletonColor from '../Skeleton/CardSkeleton'
import { Button } from '@nextui-org/react';

const ListComponents = () => {

  const { loading, movies } = useGetMovies();
  console.log('movies :', movies);
  
  return (
    <div className='w-full flex px-4 py-4 flex-1'>
      <div className='w-full flex flex-col gap-4 items-center text-center'>
        {loading ? (
          <SkeletonColor />
        ) : movies.length === 0 ? (
          'No movie'
        ) : (
          movies.map((mov) => (
            <div className='w-full flex flex-row  items-center' key={mov._id}>
              <div className="avatar placeholder w-[30%]">
                <div className="bg-neutral text-neutral-content w-14">
                  <img 
                    src={mov.SmallImage} 
                    alt="Image Preview" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start w-[55%]'>
                <h1>{mov.movieTitle}</h1>
                <i>{mov.Duration}</i>
              </div>
              <div className='w-[15%]'>
                <i>Edit</i>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default ListComponents
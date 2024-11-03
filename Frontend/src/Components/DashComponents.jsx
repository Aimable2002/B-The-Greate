import React from 'react';
import useGetMovies from '../hook/useGetMovies';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import useGetSeries from '../hook/useGetSeries';

const DashComponents = () => {
  const { loading: moviesLoading, movies } = useGetMovies();
  const { loading: seriesLoading, series } = useGetSeries();
  console.log('series :', series)
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col flex-1'>
      {moviesLoading || seriesLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='w-full flex justify-between flex-row items-center'>
            <div className='flex items-center py-4 flex-col gap-2'>
              <h1>Total Movies</h1>
              <i>{movies.length || 0}</i>
            </div>
            <div className='flex items-center py-4 flex-col gap-2'>
              <h1>Total Series</h1>
              <i>{series.series?.length || 0}</i>
            </div>
          </div>
          <Button onPress={() => navigate('/')}>Back Home</Button>
          
        </>
      )}
    </div>
  );
};

export default DashComponents;

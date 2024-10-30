import React from 'react';
import useGetMovies from '../hook/useGetMovies';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const DashComponents = () => {
  const { loading, movies } = useGetMovies();
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col flex-1'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='flex items-center py-4 flex-col gap-2'>
            <h1>Total Movies</h1>
            <i>{movies.length}</i>
          </div>
          <Button onPress={() => navigate('/')}>Back Home</Button>
        </>
      )}
    </div>
  );
};

export default DashComponents;

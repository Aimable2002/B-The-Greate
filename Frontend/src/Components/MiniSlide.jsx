import React from 'react';
import Large from '../assets/large.jpg';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MiniSlide = () => {
  const [value, setValue] = React.useState(5);
  
  return (
    <div 
      className='w-full h-[200px] bg-slate-50 flex items-center justify-center overflow-hidden' // Center the content
      style={{ 
        backgroundImage: `url(${Large})`, 
        backgroundSize: 'cover',
        borderRadius: '10px'
      }}
    >
      <div className='flex flex-col items-center justify-center text-center'> {/* Center the inner content */}
        <div className='flex flex-row items-center gap-4 mb-1'> {/* Add margin to the bottom for spacing */}
          {/* <h1 className='bg-black px-2 py-2'>P1</h1> */}
          <h1>Adventure</h1>
          <h1>Drama</h1>
          <h1>Thrill</h1>
        </div>
        <h1 className='py-1 text-lg font-semibold'>Game Of Thrones</h1>
        <div className='flex flex-row gap-4 items-center mb-2'>
          <Rating name="read-only" value={value} readOnly />
          <i>4.5</i>
          <p className='px-2 py-2 bg-amber-300 text-black' style={{ borderRadius: '4px' }}>BTHG</p>
          <i>1h:58mins</i>
        </div>
        <div className='flex flex-row mb-2'>
          <h2 className='text-red-600'>Genre: </h2>
          <i> Drama</i>
        </div>
        <div className='flex justify-center'>
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

export default MiniSlide;

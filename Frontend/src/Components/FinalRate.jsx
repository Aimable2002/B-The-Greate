import React from 'react'
import OIP from '../assets/OIP.jpg'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const FinalRate = () => {
    const [value, setValue] = React.useState(5);

  return (
    <div 
        className='w-full  bg-slate-50 flex items-center  overflow-hidden'
        style={{ 
            backgroundImage: `url(${OIP})`, backgroundSize: 'cover' , height: `calc(100vh - 150px)`,
            borderRadius: '10px'
        }}
    >
        <div className='w-full flex-col'>
            {/* <div className='flex flex-row items-center gap-4'>
                <h1 className='bg-black px-2 py-2'>P1</h1>
                <h1>Advanture</h1>
                <h1>Drama</h1>
                <h1>Thrill</h1>
            </div> */}
            <h1 className='py-4'>Game Of Throne</h1>
            <p>The game of Throne move released in 2011, this is an advature movie thrill on empires</p>
            <div className='w-full flex flex-row py-4 gap-4 items-center'>
                <h1>Feb 2022</h1>
                <i> . </i>
                    {/* <p className=' px-2 py-2 bg-amber-300 text-black' style={{borderRadius: '4px'}}>BTHG</p> */}
                    <i>2 Seasons</i>
            </div>
            <div className='flex flex-row'>
                {/* <h2 className='text-red-600'>Genre: </h2>
                <i> Drama</i> */}
            </div>
            <div className='py-4 items-center'>
                <Button 
                    variant="contained"
                    sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred', alignItems: 'center' } }}
                >
                    Stream  <PlayArrowIcon />
                </Button>
                
            </div>
        </div>
    </div>
  )
}

export default FinalRate
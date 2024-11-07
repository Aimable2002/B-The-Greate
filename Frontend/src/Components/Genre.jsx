// import React from 'react';
// import Large from '../assets/large.jpg';
// import Rating from '@mui/material/Rating';
// import { Button } from '@mui/material';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// const Genre = () => {
//     const [value, setValue] = React.useState(5);

//   return (
//     <div className="flex overflow-x-auto space-x-2">
//         <div 
//       className='w-full h-[200px] bg-slate-50 flex items-center justify-center overflow-hidden' // Center the content
//       style={{ 
//         backgroundImage: `url(${Large})`, 
//         backgroundSize: 'cover',
//         borderRadius: '10px'
//       }}
//     >
//       <div className='flex flex-col items-center justify-center text-center'>
//         <div className='flex flex-row items-center gap-4 mb-1'>
//         </div>
//         <h1 className='py-1 text-lg font-semibold'>Game Of Thrones</h1>
//       </div>
//         </div>

//         <div 
//       className='w-full h-[200px] bg-slate-50 flex items-center justify-center overflow-hidden' // Center the content
//       style={{ 
//         backgroundImage: `url(${Large})`, 
//         backgroundSize: 'cover',
//         borderRadius: '10px'
//       }}
//     >
//       <div className='flex flex-col items-center justify-center text-center'>
//         <div className='flex flex-row items-center gap-4 mb-1'>
//         </div>
//         <h1 className='py-1 text-lg font-semibold'>Game Of Thrones</h1>
//       </div>
//         </div>
//     </div>
//   )
// }

// export default Genre






import React from 'react';
import Large from '../assets/large.jpg';
import Image2 from '../assets/download (1).jpg'
import Image3 from '../assets/download (2).jpg'
import Image4 from '../assets/movie.jpg'
import Image5 from '../assets/OIP (2).jpg'

const images = [
  { src: Large, title: 'Game Of Thrones' },
  { src: Image2, title: 'Image 2' },
  { src: Image3, title: 'Image 3' },
  { src: Image4, title: 'Image 4' },
  { src: Image5, title: 'Image 5' },
];

const Genre = () => {

  return (
    <div className="flex overflow-x-auto space-x-2"> 
      {images.map((image, index) => ( 
        <div 
          key={index}
          className='w-[50%] h-[100] bg-slate-50 flex items-center justify-center overflow-hidden rounded' 
          style={{ 
            backgroundImage: `url(${image.src})`, 
            backgroundSize: 'contain',
            borderRadius: '10px'
          }}
        >
          <div className='flex flex-col items-center justify-center text-center'>
            <h1 className='py-1 text-lg font-semibold'>{image.title}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Genre;

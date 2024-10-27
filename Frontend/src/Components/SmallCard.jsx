import React from 'react'
import OIPImage from '../assets/OIP.jpg'

const SmallCard = () => {
  return (
    <div className="overflow-x-auto whitespace-nowrap"> {/* Enable horizontal scrolling */}
      <div className="flex space-x-4"> {/* Space between items */}
        {[...Array(9)].map((_, index) => ( // Adjust the number of cards to 9
          <div key={index} className='flex flex-col w-[350px] h-auto rounded'> {/* Increased width for larger cards */}
            <img 
              src={OIPImage}
              alt="Movie Cover"
              className="w-full object-contain rounded" // Adjusted height for larger images
            />
            <h1 style={{fontSize: '14px'}} className='text-center'>Mark Wilson</h1> {/* Increased font size */}
            <i style={{fontSize: '12px'}} className='text-center'>Actress</i> {/* Increased font size */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SmallCard
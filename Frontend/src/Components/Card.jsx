import React from 'react'
import OIPImage from '../assets/OIP.jpg'; 
import OtherImage from '../assets/download (1).jpg'

const Card = () => {
  return (
    <div className='flex flex-wrap  justify-center'>
        <img 
            src={OIPImage}
            className="w-[50%] p-2 h-auto rounded"
        />
        <img 
            src={OtherImage}
            className="w-[50%] p-2 h-auto rounded"
        />
    </div>
  )
}

export default Card
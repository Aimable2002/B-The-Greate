import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <div className='w-full flex flex-col'>
        <div className='flex flex-row gap-2' style={{color: 'red'}}>
            <h1>S</h1>
            <h1>Agasobanuye</h1>
        </div>
        <div className='flex flex-row py-4'>
            <h1>Email: </h1>
            <h1>Example@gmail.com</h1>
        </div>
        <h1 className='py-2'>CUSTOMER SERVICE</h1>
        <h1>+250 555 5555</h1>
        <h className='py-4'>Quick Links</h>
        <i>About Us</i>
        <i>Blog</i>
        <i>Pricing</i>
        <h className='py-4'>Movie To Watch</h>
        <i>About Us</i>
        <i>Blog</i>
        <i>Pricing</i>
        <h className='py-4'>About Company</h>
        <i>About Us</i>
        <i>Blog</i>
        <i>Pricing</i>
        <div className='flex flex-row items-center gap-5 py-4'>
            <h1>follow us on </h1>
            <div className='flex flex-row gap-4'>
                <FacebookIcon />
                <InstagramIcon />
                <WhatsAppIcon />
            </div>
        </div>
        <h1>Watch List</h1>
        <p className='py-4'>
            © 2024 <i style={{color: 'red'}}>STREAMIT</i>. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit Inc. Duplication and copy of this is strictly prohibited.
        </p>
    </div>
  )
}

export default Footer
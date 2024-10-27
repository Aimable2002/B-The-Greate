import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import LImage from '../assets/large.jpg'
import { Button, Image } from '@nextui-org/react'
import Rating from '@mui/material/Rating';
import { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard } from '../Components/ScrollCard';
import Footer from '../Components/Footer';

const View = () => {

    const [value, setValue] = React.useState(5);
    const [deviceType, setDeviceType] = useState(''); 

    const handleResize = () => {
        const width = window.innerWidth;
        if (width < 760) {
            setDeviceType('mobile');
        } else if (width < 1024) {
            setDeviceType('ipad');
        } else if (width < 1920) {
            setDeviceType('pc');
        } else {
            setDeviceType('large');
        }
    };

    useEffect(() => {
        handleResize(); // Set initial device type
        window.addEventListener('resize', handleResize); // Update on resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener
        };
    }, []);

    let ScrollComponent;
    switch (deviceType) {
        case 'mobile':
            ScrollComponent = ScrollCard;
            break;
        case 'ipad':
            ScrollComponent = IpadScrollCard;
            break;
        case 'pc':
            ScrollComponent = PcScrollCard;
            break;
        case 'large':
            ScrollComponent = LargeScrollCard;
            break;
        default:
            ScrollComponent = ScrollCard; 
    }

  return (
    <div className='w-full flex flex-col overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-10' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='py-4 px-4 mt-12 flex flex-col'>
            <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt='large image'
                className="w-full object-cover h-[200px]"
                src={LImage}
            />
            <h1 style={{fontSize: '20px'}} className='py-4'>The Big Bung</h1>
            <div className='w-full flex flex-row gap-4 items-center'>
                <Rating name="read-only" value={value} readOnly />
                <i>4.5</i>
                    <p className=' px-2 py-2 bg-amber-300 text-black' style={{borderRadius: '4px'}}>BTHG</p>
                    {/* <i>1h:58mins</i> */}
                    <Button color='primary'>Play Now</Button>
            </div>
            <div className='w-full py-4 flex flex-row gap-2'>
                <h1>Action</h1>
                <i>2hr: 20mins</i>
                <h1>  .  </h1>
                <h1> Sept 2020</h1>
            </div>
            <div className='w-full flex flex-row gap-4'>
                <h1>TAGS:  </h1>
                <h1>Action</h1>
                <h1>Assasins</h1>
                <h1>Thrill</h1>
                <h1>Advanture</h1>
            </div>
            <p className='py-4'>
                When a rogue army of humans kills Caesar’s wife and son, he sets out to exact revenge. But his quest for retribution reveals his darker instincts even as he makes a startling discovery.
            </p>
            <div className='w-full flex flex-col'>
                <h1 style={{paddingBottom: '20px'}}>Related Movies</h1>
                <ScrollComponent />
            </div>
            <div className='w-full py-4 flex flex-col'>
                <h1 style={{paddingBottom: '20px'}}>Upcoming</h1>
                <ScrollComponent />
            </div>
            <div style={{paddingTop: '20px'}}>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default View
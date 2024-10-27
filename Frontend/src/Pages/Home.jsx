import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import SlideImage from '../Components/SlideImage'
import Card from '../Components/Card'
import  { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard } from '../Components/ScrollCard'
import MiniSlide from '../Components/MiniSlide'
import SmallCard from '../Components/SmallCard'
import FinalRate from '../Components/FinalRate'
import Genre from '../Components/Genre'
import Footer from '../Components/Footer'

const Home = () => {
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
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='w-full flex flex-col overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-10' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='px-4 py-4'>
            {/* <SlideImage /> */}
            { isSmallScreen ? <SlideImage /> : null}
        </div>
        <div className='px-4 py-4 z-0'>
            <h1>Top 10 Movies To Watch</h1>
            <div className='py-4 flex-row justify-evenly'>
                {/* <Card /> */}
                {/* <ScrollCard /> */}
                {/* {isSmallScreen ? <ScrollCard /> : <IpadScrollCard /> : <PcScrollCard /> : <LargeScrollCard />} */}
                <ScrollComponent />
                <div className='w-full flex flex-row justify-between'>
                    <h1>Only On Streamit</h1>
                    <h1 style={{color: 'red'}}>View All</h1>
                </div>
            </div>
            <div className='py-4 flex-row justify-evenly'>
                {/* <ScrollCard /> */}
                <ScrollComponent />
                <h1>Upcoming Movies</h1>
            </div>
            <div className='py-4'>
                {isSmallScreen ? <MiniSlide /> : null}
            </div>
            {/* <div className='py-4 flex-row justify-evenly'>
                <h1>Your Favorite Personality</h1>
                <SmallCard />
            </div> */}
            <div className='py-4 flex-row justify-evenly'>
                <h1>Popular</h1>
                {/* <ScrollCard /> */}
                <ScrollComponent />
            </div>
            <div className='py-4 flex-row justify-evenly'>
                <h1>Popular</h1>
                {isSmallScreen ? <FinalRate /> : null}
            </div>
            {/* <div className='py-4 flex-row justify-evenly'>
                <h1>Movie Genre</h1>
                <Genre />
            </div> */}
            <div className='py-4 flex-row justify-evenly'>
                <div className='w-full flex flex-row justify-between'>
                    <h1>Recommended For You</h1>
                    <h1 style={{color: 'red'}}>View All</h1>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent />
            </div>

            <div className='py-4 flex-row justify-evenly'>
                <div className='w-full flex flex-row justify-between'>
                    <h1>Only On Streamit</h1>
                    <h1 style={{color: 'red'}}>View All</h1>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent />
            </div>

            <div className='py-4 flex-row justify-evenly'>
                <div className='w-full flex flex-row justify-between'>
                    <h1>Top Picks For You</h1>
                    <h1 style={{color: 'red'}}>View All</h1>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent />
            </div>
        </div>
        <div className='px-4 py-4'>
            <Footer />
        </div>
    </div>
  )
}

export default Home
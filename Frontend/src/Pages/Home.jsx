import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import SlideImage from '../Components/SlideImage'
import LSlideImage from '../Large/slideImage'
import Card from '../Components/Card'
import  { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard, BigScrollCard, ndBigScrollCard } from '../Components/ScrollCard'
import MiniSlide from '../Components/MiniSlide'
import SmallCard from '../Components/SmallCard'
import FinalRate from '../Components/FinalRate'
import Genre from '../Components/Genre'
import Footer from '../Components/Footer'
import useGetMovies from '../hook/useGetMovies'
import { Link } from 'react-router-dom'
import { ScrollCard1, BigScrollCard1, ndBigScrollCard1, PcScrollCard1, LargeScrollCard1, IpadScrollCard1 } from '../Components/SerieScrollComponents'

const Home = () => {
    const [deviceType, setDeviceType] = useState(''); 

    const handleResize = () => {
        const width = window.innerWidth;
        if (width > 0 && width < 370) {
            setDeviceType('mobile');
        } else if (width > 370 && width < 450) {
            setDeviceType('BigMobile');
        }else if (width > 451 && width < 650){
            setDeviceType('LargePhones')
        } else if (width > 651 && width < 1024) {
            setDeviceType('ipad');
        } else if (width > 1024 && width < 1920) {
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
    let SerieScrollComponent;
    switch (deviceType) {
        case 'mobile':
            ScrollComponent = ScrollCard;
            SerieScrollComponent = ScrollCard1;
            break;
        case 'BigMobile': 
            ScrollComponent = BigScrollCard;
            SerieScrollComponent = BigScrollCard1;
            break;
        case 'LargePhones':
            ScrollComponent = ndBigScrollCard
            SerieScrollComponent = ndBigScrollCard1;
            break;
        case 'ipad':
            ScrollComponent = IpadScrollCard;
            SerieScrollComponent = IpadScrollCard1;
            break;
        case 'pc':
            ScrollComponent = PcScrollCard;
            SerieScrollComponent = PcScrollCard1;
            break;
        case 'large':
            ScrollComponent = LargeScrollCard;
            SerieScrollComponent = LargeScrollCard1;
            break;
        default:
            ScrollComponent = ScrollCard; 
            SerieScrollComponent = ScrollCard1;
    }
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 769);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const {loading, movies} = useGetMovies()
  return (
    <>
    {/* {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : ( */}
        <div className='w-full flex flex-col hide-scrollbar overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-10' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='px-4 py-4'>
            {/* <SlideImage /> */}
            { isSmallScreen ? <SlideImage /> : <LSlideImage />}
        </div>
        <div className='px-4 hide-scrollbar py-4 z-0'>
            <h1 style={{fontSize: '30px'}} className='py-4'>Top 10 Movies To Watch</h1>
            <div className='py-4 flex-row justify-evenly'>
                {/* <Card /> */}
                {/* <ScrollCard /> */}
                {/* {isSmallScreen ? <ScrollCard /> : <IpadScrollCard /> : <PcScrollCard /> : <LargeScrollCard />} */}
                
                <ScrollComponent />
                
            </div>

            <div className='py-4 hide-scrollbar flex-row justify-evenly'>
                {/* <ScrollCard /> */}
                <div className='w-full flex py-4 flex-row items-center justify-between' style={{paddingTop: '25px'}}>
                    <h1 style={{fontSize: '30px'}}>Only On Streamit</h1>
                    <Link to='/menu'><h1 style={{color: 'red', fontSize: '20px'}}>View All</h1></Link>
                </div>
                <ScrollComponent />
            </div>

            <div className='py-4 hide-scrollbar flex-row justify-evenly'>
                {/* <ScrollCard /> */}
                <h1 style={{fontSize: '30px', paddingBottom: '20px'}}>Upcoming Movies</h1>
                <ScrollComponent />
                
            </div>
            <div className='py-4'>
                {isSmallScreen ? <MiniSlide /> : null}
            </div>
            {/* <div className='py-4 flex-row justify-evenly'>
                <h1>Your Favorite Personality</h1>
                <SmallCard />
            </div> */}
            <div className='py-4 hide-scrollbar flex-row justify-evenly'>
                {/* <h1 style={{fontSize: '30px', paddingBottom: '20px'}}>Popular</h1> */}
                <div className='w-full flex py-4 flex-row items-center justify-between' style={{paddingTop: '25px'}}>
                    <h1 style={{fontSize: '30px'}}>Popular</h1>
                    <Link to='/menu'><h1 style={{color: 'red', fontSize: '20px'}}>View All</h1></Link>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent /> 
            </div>
            <div className='py-4 flex-row justify-evenly'>
                {/* <h1>Popular</h1> */}
                {isSmallScreen ? <FinalRate /> : null}
            </div>
            {/* <div className='py-4 flex-row justify-evenly'>
                <h1>Movie Genre</h1>
                <Genre />
            </div> */}
            <div className='py-4 hide-scrollbar flex-row justify-evenly'>
                <div className='w-full flex flex-row items-center text-center justify-between'>
                    <h1 style={{fontSize: '20px'}}>Recommended For You</h1>
                    <Link to='/menu'><h1 style={{color: 'red', fontSize: '20px'}}>View All</h1></Link>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent />
            </div>

            {/* <div className='py-4 flex-row justify-evenly'>
                <div className='w-full flex flex-row justify-between'>
                    <h1>Only On Streamit</h1>
                    <h1 style={{color: 'red'}}>View All</h1>
                </div>
                {/* <ScrollCard /> 
                <ScrollComponent />
            </div> */}

            <div className='py-4 hide-scrollbar flex-row justify-evenly'>
                <div className='w-full flex flex-row items-center justify-between'>
                    <h1 style={{fontSize: '30px'}}>Top Picks For You</h1>
                    <Link to='/menu'><h1 style={{color: 'red', fontSize: '20px'}}>View All</h1></Link>
                </div>
                {/* <ScrollCard /> */}
                <ScrollComponent /> 
            </div>
        </div>
        <div className='px-4 py-4'>
            <Footer />
        </div>
    </div>
    {/* )} */}
    </>
  )
}

export default Home
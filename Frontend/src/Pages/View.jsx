import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import { Button, Image } from '@nextui-org/react'
import Rating from '@mui/material/Rating';
import { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard } from '../Components/ndScrollCard';
import Footer from '../Components/Footer';
import useGetMovies from '../hook/useGetMovies';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Alert } from '@mui/material';

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

    const {loading, movies} = useGetMovies()

    // const {id} = useParams()

    const id = JSON.parse(localStorage.getItem('CM'))

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true); // Update state to show video
        // You can also add additional logic here, like logging the play action
        console.log(`Clicked _id: ${id._id}`);
    };

    
      // Use storedMovie if selectedMovie is not set
    //   const currentMovie = selectedMovie || id;

    const getVideoIdFromUrl = (url) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    };

    const videoId = getVideoIdFromUrl(id.Trailor);

    // console.log('Trailor :', id.Trailor)

    const movieArray = ['Action', 'Adventure', 'Comedy', 'Drama', 'Thrill', 'Horror']
    const RandomMovieArray = movieArray.sort(() => Math.random() - 0.5).slice(0, 4);


    const handleDownload = () => {
        if (id.Download) {
            // Open in new tab
            window.open(id.Download, '_blank');
        } else {
            console.error('Download URL not available');
            Alert.alert('Download URL not available');
            // You might want to show a user-friendly error message here
        }
    };

  return (
    <div className='w-full flex flex-col overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-20' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='py-4 px-4 mt-12 flex flex-col'>

        {isPlaying ? (
                    <iframe
                    className="w-full h-[200px]"
                    src= {id.Trailor} // 'https://www.youtube.com/embed/1Q8fG0TtVAY?si=xsEpZSMGPXLlwT10'// // Use the extracted video ID
                    title={id.movieTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                ) : (

            <img
                shadow="sm"
                radius="lg"
                width="100%"
                alt={id.LargeImage}
                className="w-full object-cover h-[200px]"
                src={id.LargeImage}
            />

                )}
            <div className='w-full flex flex-row justify-between items-center'>
                <h1 style={{fontSize: '20px'}} className='py-4'>{id.movieTitle || ''}</h1>
                <h1 className='py-4 cursor-pointer hover:text-blue-500 flex items-center gap-2' onClick={handleDownload}><ArrowDownwardIcon />  download</h1>
            </div>
            <div className='w-full flex flex-row gap-4 items-center'>
                <Rating name="read-only" value={value} readOnly />
                <i>4.5</i>
                    <p className=' px-2 py-2 bg-amber-300 text-black' style={{borderRadius: '4px'}}>BTHG</p>
                    {/* <i>1h:58mins</i> */}
                    <Button color='primary'onPress={() => handlePlay(`clicke _id : ${id._id}`)}>Play Now</Button>
            </div>
            <div className='w-full py-4 flex flex-row gap-2'>
                <h1>Action</h1>
                <i>{id.Duration || ''}</i>
                <h1>  .  </h1>
                <h1> {id.Released_date || ''}</h1>
            </div>
            <div className='w-full flex flex-row gap-4'>
                <h1 className='text-red-600'>TAGS:  </h1>
                {/* <h1>Action</h1>
                <h1>Assasins</h1>
                <h1>Thrill</h1>
                <h1>Advanture</h1> */}
                {RandomMovieArray.map((movie, index) => (
                    <h1 key={index}>{movie}</h1>
                ))}
            </div>
            <p className='py-4'>
                {id.Description || ''}
            </p>
            {/* <div className='w-full flex flex-col'> */}
                <h1 style={{paddingBottom: '20px'}}>Newest Movies</h1>
                <ScrollComponent movies={movies} onImageClick={setCurrentMovie}/>
            {/* </div> */}
            <div className='w-full py-4 flex flex-col'>
                <h1 style={{paddingBottom: '20px'}}>Recommended</h1>
                <ScrollComponent movies={movies} onImageClick={setCurrentMovie}/>
            </div>
            <div style={{paddingTop: '20px'}}>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default View
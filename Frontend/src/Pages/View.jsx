import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import { Button, Image } from '@nextui-org/react'
import Rating from '@mui/material/Rating';
import { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard } from '../Components/ndScrollCard';
import Footer from '../Components/Footer';
import useGetMovies from '../hook/useGetMovies';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Alert } from '@mui/material';
import useGetSeries from '../hook/useGetSeries';
import { useNavigate } from 'react-router-dom';

const truncateDescription = (str, n) => {
    if (!str) return "";
    return str.length > n ? str.substring(0, n) + "..." : str;
  };

const View = () => {

    const [value, setValue] = React.useState(5);
    const [deviceType, setDeviceType] = useState(''); 

    const [currentSeason, setCurrentSeason] = useState(1);
    const [currentEpisode, setCurrentEpisode] = useState(null);

    const [expandedIds, setExpandedIds] = useState({});

    // const [movieCount, setMovieCount] = useState(getMovieCount(deviceType));

    // const [seriesCount, setSeriesCount] = useState(getSeriesCount(deviceType));


  const toggleDescription = (id, event) => {
    event.stopPropagation(); // Prevent card click when clicking show more/less
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

    const {loading: moviesLoading, movies} = useGetMovies()
    const {loading: seriesLoading, series} = useGetSeries()

    // const {id} = useParams()

    const id = JSON.parse(localStorage.getItem('CM'))
    // console.log('id : ', id.type)
    

    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentMovie, setCurrentMovie] = useState(null);

    const handleMovieClick = (movieData) => {
        setCurrentMovie(movieData);
        // If it's a series and has currentEpisode info, update that too
        if (movieData.type === 'series' && movieData.currentEpisode) {
            setCurrentEpisode(movieData.currentEpisode);
            setCurrentSeason(movieData.currentEpisode.seasonNumber);
        } else {
            // Reset episode info for movies
            setCurrentEpisode(null);
            setCurrentSeason(1);
        }
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const extractSrcFromIframe = (iframeString) => {
        if (!iframeString) return '';
    
    // Check if the URL is already a direct link (doesn't contain iframe tags)
        if (!iframeString.includes('<iframe')) {
            return iframeString;
        }
        try {
            const srcMatch = iframeString.match(/src="([^"]+)"/);
            console.log('Final src:', srcMatch ? srcMatch[1] : '');
            return srcMatch ? srcMatch[1] : '';
        } catch (error) {
            console.error('Error extracting src:', error);
            return '';
        }
    };

    const handlePlay = () => {
        setIsPlaying(true); // Update state to show video
        // You can also add additional logic here, like logging the play action
        console.log(`Clicked _id: ${id._id}`);
    };


    
      // Use storedMovie if selectedMovie is not set
    //   const currentMovie = selectedMovie || id;

    // const getVideoIdFromUrl = (url) => {
    //     const urlObj = new URL(url);
    //     return urlObj.searchParams.get('v');
    // };

    // const videoId = getVideoIdFromUrl(id.Trailor);

    // console.log('Trailor :', id.Trailor)

    const movieArray = ['Action', 'Adventure', 'Comedy', 'Drama', 'Thrill', 'Horror']
    const RandomMovieArray = movieArray.sort(() => Math.random() - 0.5).slice(0, 4);


    const handleDownload = () => {
        console.log('currentEpisode : ', currentEpisode)
        if (id.Download || currentEpisode.downloadLink) {
            // Open in new tab
            window.open(id.Download || currentEpisode.downloadLink, '_blank');
        } else {
            console.error('Download URL not available');
            Alert.alert('Download URL not available');
            // You might want to show a user-friendly error message here
        }
    };
    const [expandedDescription, setExpandedDescription] = useState(false);

    const navigate = useNavigate();

    const handleTagClick = (genre) => {
        navigate('/menu', { state: { selectedGenre: genre } });
    };

    const getRandomMovies = (movies, count) => {
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };


    const getMovieCount = (deviceType) => {
        switch (deviceType) {
            case 'mobile':
                return 4;
            case 'BigMobile':
                return 4;
            case 'LargePhones':
                return 6;
            case 'ipad':
                return 12;
            case 'Largeipad':
                return 14;
            case 'pc':
                return 24;
            case 'large':
                return 48;
            default:
                return 4;
        }
    };


  return (
    <div className='w-full flex flex-col overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-20' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='py-4 px-4 mt-12 flex flex-col'>

        {isPlaying ? (
            <>
            {/* {console.log('Debug iframe values:', {
                movieTitle: id?.movieTitle,
                currentSeason,
                currentEpisode,
                fullTitle: currentEpisode 
                    ? `${id?.movieTitle || ''} - Season ${currentSeason} Episode ${currentEpisode?.episodeNumber} - ${currentEpisode?.title} (${currentEpisode?.duration})`
                    : (id?.movieTitle || '')
            })} */}
                    <iframe
                    className="w-full h-[200px]"
                    src= {extractSrcFromIframe(id.trailer) || id.Trailor} // 'https://www.youtube.com/embed/1Q8fG0TtVAY?si=xsEpZSMGPXLlwT10'// // Use the extracted video ID
                    title={currentEpisode     
                        ? `${id?.movieTitle || ''} - Season ${currentSeason} Episode ${currentEpisode
                        ?.episodeNumber} - ${currentEpisode?.title} (${currentEpisode?.duration})`
                        : (id?.movieTitle || '')}                   
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </>
                ) : (

            <img
                shadow="sm"
                radius="lg"
                width="100%"
                alt={id.LargeImage || id.largeImage}
                className="w-full object-cover h-[200px]"
                src={id.LargeImage || id.largeImage}
            />

                )}
            <div className='w-full flex flex-row justify-between items-center'>
                {/* <h1 style={{fontSize: '20px'}} className='py-4'>{id.movieTitle || id.movieTitle && currentEpisode ? `${id.movieTitle} - S${currentSeason}E${currentEpisode?.episodeNumber || ''}` : ''}</h1> */}
                <h1 style={{fontSize: '20px'}} className='py-4'>
        {id.movieTitle}
        {id.type === 'series' && currentEpisode && ` - S${currentSeason}E${currentEpisode?.episodeNumber}`}
    </h1>
                <h1 className='py-4 cursor-pointer hover:text-blue-500 flex items-center gap-2' onClick={handleDownload}><ArrowDownwardIcon />  download</h1>
            </div>
            <div className='w-full flex flex-row gap-4 items-center'>
                <Rating name="read-only" value={value} readOnly />
                <i>4.5</i>
                    <p className=' px-2 py-2 bg-amber-300 text-black' style={{borderRadius: '4px'}}>{id.type === 'series' ? 'Series' : 'Movie'}</p>
                    {/* <i>1h:58mins</i> */}
                    <Button color='primary'onPress={() => handlePlay(`clicke _id : ${id._id}`)}>Play Now</Button>
            </div>
            <div className='w-full py-4 flex flex-col gap-2'>
                <h1>Genre:  {id.Genre}</h1>
                <h1>Translator:  {id.Translator}</h1>
                <div className='flex flex-row gap-2'>
                    <h1> {id.Duration || ''}</h1>
                    <h1> {id.Released_date || ''}</h1>
                </div>
            </div>
            <div className='w-full flex flex-row gap-4'>
                <h1 className='text-red-600'>TAGS:  </h1>
                {/* <h1>Action</h1>
                <h1>Assasins</h1>
                <h1>Thrill</h1>
                <h1>Advanture</h1> */}
                {RandomMovieArray.map((movie, index) => (
                    <h1 key={index}
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => handleTagClick(movie)}
                    >{movie}</h1>
                ))}
            </div>
            {/* <p className='py-4'>
                {/* {(id.Description || id.description)?.length > 200 ? truncateDescription(id.Description || id.description, 100) : (id.Description || id.description)} 
                
{expandedDescription
? (id.Description || id.description)
: truncateDescription(id.Description || id.description, 200)}
            </p> */}

            <div className='py-4'>
                <p>
                    {expandedDescription
                    ? (id.Description || id.description)
                    : truncateDescription(id.Description || id.description, 200)}
                </p>
                {(id.Description || id.description)?.length > 200 && (
                    <button
                        onClick={() => setExpandedDescription(!expandedDescription)}
                        className="text-blue-500 hover:text-blue-400 mt-2 flex items-center gap-1"
                    >
                        {expandedDescription ? "Show Less ▲" : "Show More ▼"}
                    </button>
                )}
            </div>


{id.type === 'series' && id.seasons && (
    <div className='w-full flex flex-col gap-4 mb-6'>
        <h2 className='text-xl font-semibold'>Seasons</h2>
        {id.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className='flex flex-col gap-2'>
                <h3 
                    className={`text-lg font-medium cursor-pointer ${
                        currentSeason === season.seasonNumber ? 'text-blue-500' : ''
                    }`}
                    onClick={() => setCurrentSeason(season.seasonNumber)}
                >
                    Season {season.seasonNumber}
                </h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                    {season.episodes.map((episode, episodeIndex) => (
                        <div 
                            key={episodeIndex}
                            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                                currentEpisode === episode ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                            onClick={() => {
                                setCurrentEpisode(episode);
                                setIsPlaying(true);
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                        >
                            <div className='flex justify-between items-center'>
                                <p>Episode {episode.episodeNumber}</p>
                                {episode.downloadUrl && (
                                    <ArrowDownwardIcon 
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(episode.downloadUrl, '_blank');
                                        }}
                                    />
                                )}
                            </div>
                            <p className='text-sm text-gray-400'>{episode.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
)}

            {/* {id.type === 'series' && id.seasons && (
                <div className='w-full flex flex-col gap-4 mb-6'>
                    <h2 className='text-xl font-semibold'>Seasons</h2>
                    {id.seasons.map((season, seasonIndex) => (
                        <div key={seasonIndex} className='flex flex-col gap-2'>
                            <h3 className='text-lg font-medium'>Season {season.seasonNumber}</h3>
                            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                                {season.episodes.map((episode, episodeIndex) => (
                                    <div 
                                        key={episodeIndex}
                                        className='p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700'
                                    >
                                        <p>Episode {episode.episodeNumber}</p>
                                        <p className='text-sm text-gray-400'>{episode.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )} */}
            {/* <div className='w-full flex flex-col'> */}
                <h1 style={{paddingBottom: '20px'}}>Newest Movies</h1>
                {/* <ScrollComponent movies={movies} onImageClick={setCurrentMovie}/> */}
                <ScrollComponent 
                    movies={movies} 
                    currentSeason={currentSeason} 
                    moviesLoading={moviesLoading} 
                    series={series} 
                    seriesLoading={seriesLoading} 
                    currentEpisode={ currentEpisode} 
                    onImageClick={handleMovieClick}
                    randomMovies={movies ? getRandomMovies(movies, getMovieCount(deviceType)) : []} 
                    isTopTen={true}
                    />
            {/* </div> */}
            <div className='w-full py-4 flex flex-col'>
                <h1 style={{paddingBottom: '20px'}}>Recommended For You</h1>
                <ScrollComponent 
                    movies={movies} 
                    currentSeason={currentSeason} 
                    moviesLoading={moviesLoading} 
                    series={series} 
                    seriesLoading={seriesLoading} 
                    currentEpisode={currentEpisode} 
                    onImageClick={handleMovieClick}
                    randomMovies={movies ? getRandomMovies(movies, getMovieCount(deviceType)) : []} 
                    isTopTen={true}
                    />

            </div>
            <div style={{paddingTop: '20px'}}>
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default View
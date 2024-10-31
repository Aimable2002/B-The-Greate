import React, {useState, useEffect} from 'react'
import ButtonAppBar from '../Components/Header'
import { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard, BigScrollCard, ndBigScrollCard } from '../Components/ScrollCard'

const MenuMovie = () => {

  const movieArray = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Thrill', 'Horror']
    // const RandomMovieArray = movieArray.sort(() => Math.random() - 0.5).slice(0, 4);

    const [isAction, setIsAction] = useState(false)
    const [isAdventure, setIsAdventure] = useState(false)
    const [isComedy, setIsComedy] = useState(false)
    const [isDrama, setIsDrama] = useState(false)
    const [isThrill, setIsThrill] = useState(false)
    const [isHorror, setIsHorror] = useState(false)
    const [isAll, setIsAll] = useState(true)

    const [isClicked, setIsClicked] = useState('All')

    const handleClick = (movie) => {
      setIsClicked(movie)

      setIsAll(false)
      setIsAction(false)
      setIsAdventure(false)
      setIsComedy(false)
      setIsDrama(false)
      setIsThrill(false)
      setIsHorror(false)

      switch (movie) {
        case 'All':
          setIsAll(true)
          break;
        case 'Action':
          setIsAction(true)
          break;
        case 'Adventure':
          setIsAdventure(true)
          break;
        case 'Comedy':
          setIsComedy(true)
          break;
        case 'Drama':
          setIsDrama(true)
          break;
        case 'Thrill':
          setIsThrill(true)
          break;
        case 'Horror':
          setIsHorror(true)
          break;
      }
    }

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
    switch (deviceType) {
        case 'mobile':
            ScrollComponent = ScrollCard;
            break;
        case 'BigMobile': 
            ScrollComponent = BigScrollCard;
            break;
        case 'LargePhones':
            ScrollComponent = ndBigScrollCard
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
    <div className='w-full flex flex-col px-4 py-4 hide-scrollbar overflow-auto'>
        <div className='top-0 left-0 right-0 px-4 py-4 flex justify-between items-center fixed z-20' style={{ backgroundColor: '#0F0F0F' }}>
            <ButtonAppBar />
        </div>
        <div className='w-full overflow-x-auto hide-scrollbar flex flex-row gap-4 items-center mt-10 mb-4 z-0'>
          {movieArray.map((movie, index) => (
                    <h1 key={index} onClick={() => handleClick(movie)} style={{color: isClicked === movie ? 'red' : 'white'}}>{movie}</h1>
                ))}
        </div>
        <ScrollComponent />
    </div>
  )
}

export default MenuMovie
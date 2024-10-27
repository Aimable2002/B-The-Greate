import React, {useState, useEffect} from 'react'
import { ScrollCard, IpadScrollCard, PcScrollCard, LargeScrollCard } from '../Components/ScrollCard';

const ResizeComponent = () => {
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

    return {ScrollComponent}

}

export default ResizeComponent
import React, {useState} from 'react'
import DashComponents from '../Components/DashComponents'
import ListComponents from '../Components/ListComponents'
import Upload from '../Components/Upload'
import SeriesUpload from '../Components/seriesUpload'

const Dashboard = () => {

    const [isButton, setIsButton] = useState('Dashboard')
    const [dashboard, setDashboard] = useState(true)
    const [List, setList] = useState(false)
    const [upload, setUpload] = useState(false)
    const [series, setSeries] = useState(false)
    const handleButton = (e) => {
        setIsButton(e)

        setDashboard(false)
        setList(false)
        setUpload(false)
        setSeries(false)
        
        switch (e) {
            case 'dashboard':
                setDashboard(true)
                break;
            case 'List':
                setList(true)
                break;
            case 'Upload':
                setUpload(true)
                break
            case 'Series':
                setSeries(true)
                break
            default:
                break;
        }
        
    }

  return (
    <div className='w-full flex flex-col flex-1 px-4 py-4'>
        <div className='w-full items-center justify-center gap-4 flex flex-col'>
            <div>
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">D</span>
                    </div>
                </div>
                
            </div>
            <div className='flex flex-col items-center justify-center'>
                    <h1>Guest</h1>
                    <h2>example@gmail.com</h2>
                </div>
        </div>

        <div className='w-full flex py-5 items-center justify-around flex-row'>
            <h1 
                className={`cursor-pointer ${isButton === 'dashboard' ? 'text-red-600' : 'text-white'}`}
                onClick={(e) => handleButton('dashboard')}
            >
                    Dashboard
            </h1>
            <h1 
                className={`cursor-pointer ${isButton === 'List' ? 'text-red-600' : ''}`}
                onClick={(e) => handleButton('List')}
            >
                List
            </h1>
            <h1 
                className={`cursor-pointer ${isButton === 'Upload' ? 'text-red-600' : ''}`}
                onClick={(e) => handleButton('Upload')}
            >
                Upload
            </h1>
            <h1 
                className={`cursor-pointer ${isButton === 'Series' ? 'text-red-600' : ''}`}
                onClick={(e) => handleButton('Series')}
            >
                Series
            </h1>
        </div>
        {dashboard && <DashComponents />}
        {List && <ListComponents />}
        { upload && <Upload />}
        { series && <SeriesUpload />}
    </div>
  )
}

export default Dashboard
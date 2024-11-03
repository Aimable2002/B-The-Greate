import React, {useState, useEffect, useRef} from 'react'
import { Button } from '@nextui-org/react'

const AddSeries = ({seriesId, seriesName}) => {
    const [status, setStatus] = React.useState('Ready');

    const addRef1 = useRef();
    const addRef2 = useRef();
    const [files, setFiles] = useState([null, null]); 
    const [imagePreviews, setImagePreviews] = useState([null, null]); 

    const [input, setInput] = React.useState({
        seasons: [{
            seasonNumber: 1,
            episodes: [{
                episodeNumber: 1,
                title: '',
                duration: '',
                downloadLink: '',
            }]
        }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [_, seasonIndex, episodeIndex, field] = name.split('_');
        
        setInput(prev => {
            const newSeasons = [...prev.seasons];
            newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
            return { ...prev, seasons: newSeasons };
        });
    };

    const addSeason = () => {
        setInput(prev => ({
            ...prev,
            seasons: [...prev.seasons, {
                seasonNumber: prev.seasons.length + 1,
                episodes: [{
                    episodeNumber: 1,
                    title: '',
                    duration: '',
                    downloadLink: '',
                }]
            }]
        }));
    };
    
    const addEpisode = (seasonIndex) => {
        setInput(prev => {
            const newSeasons = [...prev.seasons];
            newSeasons[seasonIndex].episodes.push({
                episodeNumber: newSeasons[seasonIndex].episodes.length + 1,
                title: '',
                duration: '',
                downloadLink: '',
            });
            return { ...prev, seasons: newSeasons };
        });
    };
    
    const deleteSeason = (seasonIndex) => {
        setInput(prev => ({
            ...prev,
            seasons: prev.seasons.filter((_, index) => index !== seasonIndex)
        }));
    };
    
    const deleteEpisode = (seasonIndex, episodeIndex) => {
        setInput(prev => {
            const newSeasons = [...prev.seasons];
            newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, index) => index !== episodeIndex);
            return { ...prev, seasons: newSeasons };
        });
    };
    const [updateState, setUpdateState] = useState(null)

    const handleSubmit = async () => {
        const formData = new FormData();
        
        // Only append the seasons data
        formData.append('seriesId', seriesId);
        formData.append('seasons', JSON.stringify(input.seasons));

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        
        try {
            setUpdateState('pending');
            const response = await fetch('https://b-the-greate.onrender.com/api/series/add', {
                method: 'POST',
                body: formData,
            });
            
            const data = await response.json();

            if (response.ok) {
                setUpdateState('success');
                console.log('Upload successful:', data.message);
            } else {
                setUpdateState('failed');
                console.error('Upload failed:', data.message);
            }
        } catch (error) {
            console.error('Error uploading:', error);
            setUpdateState('fail');
        }
    };

    const statusMessage = () => {
        switch(updateState) {
            case 'pending':
                return 'Uploading...';
            case 'success':
                return 'Completed';
            case 'failed':
                return 'Failed';
            default:
                return 'Save Changes';
        }
      };



  return (
    <div className='w-[100%] flex flex-col gap-4 mt-4'>
        <h1 className='text-2xl font-bold'>{seriesName}</h1>
                {input.seasons.map((season, seasonIndex) => (
                    <div key={seasonIndex} className='border p-4 rounded-lg'>
                        <h3 className='text-lg font-bold mb-4'>Season {season.seasonNumber}</h3>
                        
                        <Button 
                            size="sm" 
                            color="danger"
                            onClick={() => deleteSeason(seasonIndex)}
                        >
                            Delete Season
                        </Button>

                        {season.episodes.map((episode, episodeIndex) => (
                            <div key={episodeIndex} className='ml-4 mb-4'>
                                <h4 className='font-semibold mb-2'>Episode {episode.episodeNumber}</h4>
                                
                                <Button 
                                    size="sm" 
                                    color="danger"
                                    onClick={() => deleteEpisode(seasonIndex, episodeIndex)}
                                >
                                    Delete Episode
                                </Button>

                                <div className='flex flex-col gap-2'>
                                    <label className="input input-bordered flex items-center w-full gap-2">
                                        Title
                                        <input 
                                            type="text"
                                            name={`season_${seasonIndex}_${episodeIndex}_title`}
                                            value={episode.title}
                                            // onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'title', e.target.value)}
                                            onChange={handleChange}
                                            className="grow w-full"
                                            placeholder="Episode Title"
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center w-full gap-2">
                                        Duration
                                        <input 
                                            type="text"
                                            name={`season_${seasonIndex}_${episodeIndex}_duration`}
                                            value={episode.duration}
                                            // onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'duration', e.target.value)}
                                            onChange={handleChange}
                                            className="grow w-full"
                                            placeholder="Duration"
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center w-full gap-2">
                                        Download Link
                                        <input 
                                            type="text"
                                            name={`season_${seasonIndex}_${episodeIndex}_downloadLink`}
                                            value={episode.downloadLink}
                                            // onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'downloadLink', e.target.value)}
                                            onChange={handleChange}
                                            className="grow w-full"
                                            placeholder="https://example.com/download"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                        
                        <Button 
                            size="sm" 
                            onClick={() => addEpisode(seasonIndex)}
                            className="mt-2"
                        >
                            Add Episode
                        </Button>
                    </div>
                ))}
                
                <Button 
                    size="lg"
                    onClick={addSeason}
                    className="mt-4"
                >
                    Add Season
                </Button>
                <Button size='xxlg' onClick={handleSubmit}>Upload : {statusMessage()}</Button>
            </div>
  )
}

export default AddSeries
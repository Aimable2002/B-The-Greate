import { Button } from '@nextui-org/react';
import React, { useRef, useState } from 'react';



const seriesUpload = () => {
    // Add new state for seasons and episodes
    const [seasons, setSeasons] = useState([{
        seasonNumber: 1,
        episodes: [{
            episodeNumber: 1,
            title: '',
            duration: '',
            downloadLink: '',
        }]
    }]);

    // ... existing state (files, imagePreviews, input) ...

    // Add new handlers for seasons and episodes
    const addSeason = () => {
        setSeasons(prev => [...prev, {
            seasonNumber: prev.length + 1,
            episodes: [{
                episodeNumber: 1,
                title: '',
                duration: '',
                downloadLink: '',
            }]
        }]);
    };

    const addEpisode = (seasonIndex) => {
        setSeasons(prev => {
            const newSeasons = [...prev];
            newSeasons[seasonIndex].episodes.push({
                episodeNumber: newSeasons[seasonIndex].episodes.length + 1,
                title: '',
                duration: '',
                downloadLink: '',
            });
            return newSeasons;
        });
    };

    const handleEpisodeChange = (seasonIndex, episodeIndex, field, value) => {
        setSeasons(prev => {
            const newSeasons = [...prev];
            newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
            return newSeasons;
        });
    };


    const [updateState, setUpdateState] = useState(null)
    const handleSubmit = async () => {
        const formData = new FormData();


        // Add seasons data
    formData.append('seasons', JSON.stringify(seasons));
    console.log('Adding seasons:', seasons);

    // Log complete form data
    console.log('=== Complete FormData Contents ===');
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

        // try {
        //     setUpdateState('pending');
        //     const response = await fetch('https://b-the-greate.onrender.com/api/upload', {
        //         method: 'POST',
        //         body: formData,
        //     });
        //     const response2 = await fetch('http://localhost:3000/api/upload', {
        //         method: 'POST',
        //         body: formData2,
        //     });
        //     const data = await response.json();

        //     if (response.ok) {
        //         setUpdateState('success');
        //         console.log('Upload successful:', data.message);
        //         // Maybe show a success toast with data.message
        //     } else {
        //         setUpdateState('failed');
        //         console.error('Upload failed:', data.message);
        //         // Maybe show an error toast with data.message
        //     }

        //     console.log('Text Upload successful:', response);
        //     setUpdateState(response.status)
        //     console.log('File Upload successful:', response.status);
        // } catch (error) {
        //     console.error('Error uploading:', error);
        //     setUpdateState('fail');
        // }
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
                return 'Waiting..';
        }
    };

    const deleteSeason = (seasonIndex) => {
        setSeasons(prev => prev.filter((_, index) => index !== seasonIndex));
    };
    
    const deleteEpisode = (seasonIndex, episodeIndex) => {
        setSeasons(prev => {
            const newSeasons = [...prev];
            newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, index) => index !== episodeIndex);
            return newSeasons;
        });
    };

    return (
        <div className='w-[100%] flex items-center justify-center flex-col flex-1'>
            {/* Existing form fields */}
            {/* ... */}

            {/* Add Seasons and Episodes section */}
            <div className='w-[100%] flex flex-col gap-4 mt-4'>
                {seasons.map((season, seasonIndex) => (
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
                                            value={episode.title}
                                            onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'title', e.target.value)}
                                            className="grow w-full"
                                            placeholder="Episode Title"
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center w-full gap-2">
                                        Duration
                                        <input 
                                            type="text"
                                            value={episode.duration}
                                            onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'duration', e.target.value)}
                                            className="grow w-full"
                                            placeholder="Duration"
                                        />
                                    </label>
                                    <label className="input input-bordered flex items-center w-full gap-2">
                                        Download Link
                                        <input 
                                            type="text"
                                            value={episode.downloadLink}
                                            onChange={(e) => handleEpisodeChange(seasonIndex, episodeIndex, 'downloadLink', e.target.value)}
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

            {/* Existing image upload and submit button */}
            {/* ... */}
            
        </div>
    );
};



export default seriesUpload





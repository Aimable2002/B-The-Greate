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

    const addRef1 = useRef();
    const addRef2 = useRef();
    const [files, setFiles] = useState([null, null]); 
    const [imagePreviews, setImagePreviews] = useState([null, null]); 
    const [input, setInput] = useState({
        Name: '',
        Released_Date: '',
        Studio: '',
        Production_Company: '',
        Description: '',
        Trailor: '', 
        Category: '',
        smallImage: '',  
        largeImage: '',
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

    const handleFileRef1 = () => {
        addRef1.current.click();
    };

    const handleFileRef2 = () => {
        addRef2.current.click();
    };

    const handleUpload = async (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newFiles = [...files];
            const previewUrl = URL.createObjectURL(file);
            newFiles[index] = file;
            setFiles(newFiles);

            const newPreviews = [...imagePreviews];
            newPreviews[index] = previewUrl;
            setImagePreviews(newPreviews);
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setInput(prev => ({ ...prev, [name]: value }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('season_')) {
            // Parse the season and episode indices from the name
            const [_, seasonIndex, episodeIndex, field] = name.split('_');
            setInput(prev => {
                const newSeasons = [...prev.seasons];
                newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
                return { ...prev, seasons: newSeasons };
            });
        } else {
            setInput(prev => ({ ...prev, [name]: value }));
        }
    };

    // ... existing state (files, imagePreviews, input) ...

    // Add new handlers for seasons and episodes
    // const addSeason = () => {
    //     setSeasons(prev => [...prev, {
    //         seasonNumber: prev.length + 1,
    //         episodes: [{
    //             episodeNumber: 1,
    //             title: '',
    //             duration: '',
    //             downloadLink: '',
    //         }]
    //     }]);
    // };

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

    // const addEpisode = (seasonIndex) => {
    //     setSeasons(prev => {
    //         const newSeasons = [...prev];
    //         newSeasons[seasonIndex].episodes.push({
    //             episodeNumber: newSeasons[seasonIndex].episodes.length + 1,
    //             title: '',
    //             duration: '',
    //             downloadLink: '',
    //         });
    //         return newSeasons;
    //     });
    // };

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

    // const handleEpisodeChange = (seasonIndex, episodeIndex, field, value) => {
    //     setSeasons(prev => {
    //         const newSeasons = [...prev];
    //         newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
    //         return newSeasons;
    //     });
    // };

    const handleEpisodeChange = (seasonIndex, episodeIndex, field, value) => {
        setInput(prev => {
            const newSeasons = [...prev.seasons];
            newSeasons[seasonIndex].episodes[episodeIndex][field] = value;
            return { ...prev, seasons: newSeasons };
        });
    };

    const [updateState, setUpdateState] = useState(null)
    const handleSubmit = async () => {
        const formData = new FormData();


        // Add seasons data
    // formData.append('seasons', JSON.stringify(seasons));
    // console.log('Adding seasons:', seasons);

    if (files[0]) formData.append('image1', files[0]);
    if (files[1]) formData.append('image2', files[1]);

    Object.keys(input).forEach(key => {
        if (key === 'seasons') {
            formData.append('seasons', JSON.stringify(input.seasons));
        } else {
            formData.append(key, input[key]);
        }
    });

    // Log complete form data
    console.log('=== Complete FormData Contents ===');
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

        try {
            setUpdateState('pending');
            const response = await fetch('https://b-the-greate.onrender.com/api/upload/series', {
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

            console.log('Text Upload successful:', response);
            setUpdateState(response.status)
            console.log('File Upload successful:', response.status);
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
                return 'Waiting..';
        }
    };

    // const deleteSeason = (seasonIndex) => {
    //     setSeasons(prev => prev.filter((_, index) => index !== seasonIndex));
    // };

    const deleteSeason = (seasonIndex) => {
        setInput(prev => ({
            ...prev,
            seasons: prev.seasons.filter((_, index) => index !== seasonIndex)
        }));
    };
    
    // const deleteEpisode = (seasonIndex, episodeIndex) => {
    //     setSeasons(prev => {
    //         const newSeasons = [...prev];
    //         newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, index) => index !== episodeIndex);
    //         return newSeasons;
    //     });
    // };

    const deleteEpisode = (seasonIndex, episodeIndex) => {
        setInput(prev => {
            const newSeasons = [...prev.seasons];
            newSeasons[seasonIndex].episodes = newSeasons[seasonIndex].episodes.filter((_, index) => index !== episodeIndex);
            return { ...prev, seasons: newSeasons };
        });
    };

    return (
        <div className='w-[100%] flex items-center justify-center flex-col flex-1'>
            {/* Existing form fields */}
            {/* ... */}

            <div className='w-[100%] flex flex-col flex-1'>
            <div className='w-full items-center justify-between gap-4 flex flex-row'>
                <div className='w-[30%] flex'>
                    <div className="avatar placeholder" onClick={handleFileRef1}>
                        <div className="bg-neutral text-neutral-content w-24">
                            {imagePreviews[0] ? (
                                <img 
                                    src={imagePreviews[0]} 
                                    alt="Image Preview 1" 
                                    className="w-24 h-24 object-contain"
                                />
                            ) : ( 
                                <span className='text-3xl'> Img 1 </span>
                            )}
                        </div>
                    </div>
                    <input
                        ref={addRef1}
                        style={{ display: 'none' }}
                        type='file'
                        onChange={(e) => handleUpload(e, 0)}
                    />
                </div>
                <div className='w-[70%] flex flex-col gap-4 items-center justify-center'>
                    <label className="input input-bordered flex items-center w-full gap-2">
                        Name
                        <input 
                            type="text" 
                            name="Name"
                            placeholder="Avator"
                            className="grow w-full" 
                            onChange={handleChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center w-full gap-2">
                        Released Date
                        <input 
                            type="text" 
                            name="Released_Date"
                            placeholder="10 Oct 2020"
                            className="grow w-full" 
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            
            <div className='w-full flex flex-col gap-4 mt-4'>
           {['Studio', 'Production Company', 'Description', 'Trailor'].map((label, index) => (
               <label 
                   key={index}
                   className="input input-bordered flex items-center w-full gap-2"
               >
                   {label}
                   <input 
                       type="text" 
                       name={label.replace(' ', '_')} // Convert spaces to underscores for keys
                       className="grow w-full" 
                        placeholder={
                            label === 'Studio' ? 'Marvel' : 
                            label === 'Production Company' ? 'Century' : 
                            label === 'Description' ? '' :  
                            label === 'Trailor' ? 'https://www.example.com/' : ''
                        } 
                       onChange={handleChange}
                   />
               </label>
           ))}

                <select 
                        name="Category" 
                        className="select select-bordered w-full" 
                        value={input.Category} 
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Romance">Romance</option>
                        <option value="Action">Action</option>
                        <option value="Thrill">Thrill</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Adventure">Drama</option>
                    </select>

                    {/* <select 
                        name="Type" 
                        className="select select-bordered w-full" 
                        value={input.Type} 
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Type</option>
                        <option value="Movie">Movie</option>
                        <option value="Serie">Serie</option>
                    </select> */}

       </div>

            <div className='w-full flex flex-col gap-4 mt-4'>
                <div className='w-[30%] flex'>
                    <div className="avatar placeholder" onClick={handleFileRef2}>
                        <div className="bg-neutral text-neutral-content w-24">
                            {imagePreviews[1] ? (
                                <img 
                                    src={imagePreviews[1]} 
                                    alt="Image Preview 2" 
                                    className="w-24 h-24 object-contain"
                                />
                            ) : ( 
                                <span className='text-3xl'> Img 2 </span>
                            )}
                        </div>
                    </div>
                    <input
                        ref={addRef2}
                        style={{ display: 'none' }}
                        type='file'
                        onChange={(e) => handleUpload(e, 1)}
                    />
                </div>
                {/* <Button size='xxlg' onClick={handleSubmit}>Upload : {statusMessage()}</Button> */}
            </div>
        </div>

            {/* Add Seasons and Episodes section */}
            <div className='w-[100%] flex flex-col gap-4 mt-4'>
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

            {/* Existing image upload and submit button */}
            {/* ... */}
            
        </div>
    );
};



export default seriesUpload





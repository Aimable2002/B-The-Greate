import React, { useState, useRef } from 'react'
import useGetSeries from '../hook/useGetSeries'
import SkeletonColor from '../Skeleton/CardSkeleton'
import { Button } from '@nextui-org/react';

const SerieComponents = () => {

    const { loading, series } = useGetSeries()
  
  const [editTitle, setEditTitle] = useState('');
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [trailor, setTrailor] = useState('');
  const smallImageRef = useRef(null);
  const largeImageRef = useRef(null);

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'small') setSmallImage(reader.result);
        else setLargeImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (movie) => {
    setEditTitle(movie.movieTitle);
    setSmallImage(movie.smallImage);
    setLargeImage(movie.largeImage);
    setTrailor(movie.trailor);
  };

  const [editingMovieId, setEditingMovieId] = useState(null);

  const handleDelete = async (movieId) => {
    // Implement your delete logic here
    console.log('Deleting movie:', movieId);
  };




  // ... existing code ...

  const [updateState, setUpdateState] = useState(null)

  const handleSaveChanges = async () => {
    console.log('clicked')
    if (!editingMovieId) {
      console.error('No movie ID found');
      return;
    }
    const formData = new FormData();
    
    // Add text data
    formData.append('movieId', editingMovieId);
    formData.append('movieTitle', editTitle);
    formData.append('trailor', trailor);
    formData.append('download', download);

    // Add seasons data as JSON string
    formData.append('seasons', JSON.stringify(input.seasons));

    // Add images if they exist
    if (smallImageRef.current.files[0]) {
      formData.append('image1', smallImageRef.current.files[0]);
    }
    
    if (largeImageRef.current.files[0]) {
      formData.append('image2', largeImageRef.current.files[0]);
    }

    console.log('Final FormData contents:');
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
      setUpdateState('pending');
      const response = await fetch('https://b-the-greate.onrender.com/api/upload/changes', {
          method: 'POST',
          body: formData,
      });
      const data = await response.json();

      if (response.ok) {
          setUpdateState('success');
          console.log('Upload successful:', data.message);
          // Optionally reset the form or close the modal here
      } else {
          setUpdateState('failed');
          console.error('Upload failed:', data.message);
      }

    } catch (error) {
        setUpdateState('failed');
        console.error('Error uploading:', error);
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
// ... existing code ...

// Update the Save Changes button onClick handler:

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

  return (
    <div className='w-full flex px-4 py-4 flex-1'>
      <div className='w-full flex flex-col gap-4 items-center text-center'>
        {loading ? (
          <SkeletonColor />
        ) : series.length === 0 ? (
          'No movie'
        ) : (
          series.series.map((mov) => (
            <div className='w-full flex flex-row  items-center' key={mov._id}>
              <div className="avatar placeholder w-[30%]">
                <div className="bg-neutral text-neutral-content w-14">
                  <img 
                    src={mov.smallImage} 
                    alt="Image Preview" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start w-[55%]'>
                <h1>{mov.movieTitle}</h1>
                <i>Serie</i>
              </div>
              <div className='w-[15%]'>
                {/* <i onClick={()=>document.getElementById(mov._id).showModal()}>Edit</i> */}
                <i onClick={() => {
                    setEditingMovieId(mov._id);  // Store the movie ID being edited
                    handleEdit(mov);  // Set other edit values
                    document.getElementById(mov._id).showModal();
                    }}>Edit</i>
                <dialog id={mov._id} className="modal">
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg mb-4">Edit Movie : {mov.movieTitle}</h3>
      
      <div className="flex flex-col gap-4">
        <div>
          <label className="label">Movie Title</label>
          <input 
            type="text" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Movie Trailor</label>
          <input 
            type="text" 
            value={trailor}
            onChange={(e) => setTrailor(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        {/* <div>
          <label className="label">Movie Download URL</label>
          <input 
            type="text" 
            value={download}
            onChange={(e) => setDownload(e.target.value)}
            className="input input-bordered w-full"
          />
        </div> */}

        <div className="flex gap-4">
          <div>
            <label className="label">Small Image</label>
            <div className="avatar placeholder cursor-pointer" onClick={() => smallImageRef.current.click()}>
              <div className="bg-neutral text-neutral-content w-24 h-24">
                {smallImage ? (
                  <img src={smallImage} alt="Small Preview" className="w-full h-full object-contain"/>
                ) : (
                  <span>Small</span>
                )}
              </div>
            </div>
            <input
              ref={smallImageRef}
              type="file"
              className="hidden"
              onChange={(e) => handleImageUpload(e, 'small')}
              accept="image/*"
            />
          </div>

          <div>
            <label className="label">Large Image</label>
            <div className="avatar placeholder cursor-pointer" onClick={() => largeImageRef.current.click()}>
              <div className="bg-neutral text-neutral-content w-24 h-24">
                {largeImage ? (
                  <img src={largeImage} alt="Large Preview" className="w-full h-full object-contain"/>
                ) : (
                  <span>Large</span>
                )}
              </div>
            </div>
            <input
              ref={largeImageRef}
              type="file"
              className="hidden"
              onChange={(e) => handleImageUpload(e, 'large')}
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <Button 
            color="danger" 
            onClick={() => handleDelete(mov._id)}
          >
            Delete Movie
          </Button>
          <Button 
            color="primary"
            // onPress={handleSaveChanges}
            onClick={handleSaveChanges}
          >
            {statusMessage()}
          </Button>
        </div>
      </div>

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


    </div>
                </dialog>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default SerieComponents


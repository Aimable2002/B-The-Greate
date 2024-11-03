import React, { useState, useRef } from 'react'
import useGetMovies from '../hook/useGetMovies'
import SkeletonColor from '../Skeleton/CardSkeleton'
import { Button } from '@nextui-org/react';
import SerieComponents from './SerieComponents'
import useGetSeries from '../hook/useGetSeries';
import AddSeries from './AddSeries';

const ListComponents = () => {

  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const allContent = [
    ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
    ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  ]

  const isLoading = moviesLoading || seriesLoading
  
  const [editTitle, setEditTitle] = useState('');
  const [smallImage, setSmallImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [trailor, setTrailor] = useState('');
  const [download, setDownload] = useState('');
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
    setSmallImage(movie.SmallImage);
    setLargeImage(movie.LargeImage);
    setTrailor(movie.Trailor);
    setDownload(movie.Download);
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

  //   console.log({
  //     editingMovieId,
  //     editTitle,
  //     smallImage,
  //     largeImage,
  //     smallImageFiles: smallImageRef.current?.files,
  //     largeImageFiles: largeImageRef.current?.files
  // });
    if (!editingMovieId) {
      console.error('No movie ID found');
      return;
    }
    const formData = new FormData();
    
    // Add text data
    formData.append('movieId', editingMovieId);
    formData.append('movieTitle', editTitle);
    formData.append('trailor', trailor);     // Add trailer
    formData.append('download', download); 

    // Add images if they exist (similar to Upload component's approach)
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
      } else {
          setUpdateState('failed');
          console.error('Upload failed:', data.message);
      }

  } catch (error) {
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


// ... existing code ...

  return (
    <>
        <div className='w-full flex px-4 py-4 flex-1'>
      <div className='w-full flex flex-col gap-4 items-center text-center'>
        {isLoading ? (
          <SkeletonColor />
        ) : !isLoading && allContent.length === 0 ? (
          'No movie'
        ) : (
          allContent.map((mov) => (
            <div className='w-full flex flex-row  items-center' key={mov._id}>
              <div className="avatar placeholder w-[30%]">
                <div className="bg-neutral text-neutral-content w-14">
                  <img 
                    src={mov.SmallImage || mov.smallImage} 
                    alt="Image Preview" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
              <div className='flex flex-col gap-2 items-start w-[55%]'>
                <h1>{mov.movieTitle}</h1>
                <i>{mov.Duration || ''}</i>
              </div>
              <div className='w-[15%] '>
                <div className='flex flex-row gap-4'>
                {mov.type === 'series' && (
                  <i onClick={() => {
                    setEditingMovieId(mov._id); 
                    handleEdit(mov); 
                    document.getElementById(`series-${mov._id}`).showModal();
                  }}>Add</i>
                )}
                                  <i onClick={() => {
                    setEditingMovieId(mov._id);  // Store the movie ID being edited
                    handleEdit(mov);  // Set other edit values
                    document.getElementById(mov._id).showModal();
                  }}>Edit</i>
                </div>

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
                      <div>
                        <label className="label">Movie Download URL</label>
                        <input 
                          type="text" 
                          value={download}
                          onChange={(e) => setDownload(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </div>

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
                  </div>
                </dialog>

                {mov.type === 'series' && (
    <dialog id={`series-${mov._id}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <AddSeries seriesId={mov._id} seriesName={mov.movieTitle} seriesData={mov} />
      </div>
    </dialog>
  )}

              </div>
            </div>
          ))
        )}
      </div>
    </div>
    {/* <SerieComponents /> */}
    </>
  );
  
}

export default ListComponents


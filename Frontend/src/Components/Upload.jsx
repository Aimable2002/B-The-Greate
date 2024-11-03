
import { Button } from '@nextui-org/react';
import React, { useRef, useState } from 'react';
import {Select, SelectItem} from "@nextui-org/react";


const Upload = () => {
    const addRef1 = useRef();
    const addRef2 = useRef();
    const [files, setFiles] = useState([null, null]); 
    const [imagePreviews, setImagePreviews] = useState([null, null]); 
    const [input, setInput] = useState({
        Name: '',
        Duration: '',
        Studio: '',
        Production_Company: '',
        Description: '',
        Released_Date: '',
        Trailor: '', 
        Download: '',
        Category: '',
        Type: '',
        Genre: [],
        Director: '',
        Translator: '',
        Tags: ''
    });

    const animals = [
        {key: 'Action', label: 'Action'},
        {key: 'Thriller', label: 'Thriller'},
        {key: 'Romance', label: 'Romance'},
        {key: 'Comedy', label: 'Comedy'},
        {key: 'Adventure', label: 'Adventure'},
        {key: 'Politics', label: 'Politics'},
        {key: 'History', label: 'History'},
        {key: 'Horror', label: 'Horror'},
        {key: 'Fantasy', label: 'Fantasy'},
        {key: 'Romance', label: 'Romance'},
        {key: 'Animation', label: 'Animation'},
        {key: 'Biography', label: 'Biography'},
        {key: 'History', label: 'History'},

        {key: 'Drama', label: 'Drama'},
        {key: 'Mystery', label: 'Mystery'},
        {key: 'Crime', label: 'Crime'},
        {key: 'War', label: 'War'},
        {key: 'Family', label: 'Family'},

        {key: 'Western', label: 'Biography'},
        {key: 'Music', label: 'History'},

        {key: 'Musical', label: 'Drama'},
        {key: 'Sport', label: 'Mystery'},
        {key: 'Adult', label: 'Crime'},
        {key: 'Adult.18+', label: 'War'},
        {key: 'Short', label: 'Family'},
    ];

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
        setInput(prev => ({ ...prev, [name]: value }));
    };
    const [updateState, setUpdateState] = useState(null)
    const handleSubmit = async () => {
        const formData = new FormData();
        for (const key in input) {
            if (input[key]) {
                formData.append(key, input[key]);
            }
        }

        const formData2 = new FormData();
        files.forEach((file, index) => {
            if (file) {
                formData.append(`image${index + 1}`, file); 
            }
        });

        console.log('FormData 1:', Array.from(formData.entries()));
        console.log('FormData 2:', Array.from(formData2.entries()));

        try {
            setUpdateState('pending');
            const response = await fetch('https://b-the-greate.onrender.com/api/upload', {
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
    // const statusMessage = updateState === null 
    //     ? '' 
    //     : updateState === 'true' 
    //         ? 'Upload successful' 
    //         : 'Upload';

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


    return (
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
                        Duration
                        <input 
                            type="text" 
                            name="Duration"
                            placeholder="1hr:20mins"
                            className="grow w-full" 
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            
            <div className='w-full flex flex-col gap-4 mt-4'>
           {['Studio', 'Production Company', 'Description', 'Released Date', 'Trailor', 'Download', 'Director', 'Translator', 'Tags'].map((label, index) => (
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
                            label === 'Released Date' ? '10 Oct 2020' : 
                            label === 'Trailor' ? 'https://www.example.com/' : 
                            label === 'Download' ? 'https://www.example.com/' : 
                            label === 'Director' ? 'Christopher Nolan' :
                            label === 'Translator' ? 'B The Great' :
                            label === 'Tags' ? 'Avatar, Air, Monarchy' : ''
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
                        {/* <option value="Romance">Romance</option>
                        <option value="Action">Action</option>
                        <option value="Thrill">Thrill</option> */}
                        <option value="Movie">Movie</option>
                        <option value="Tv Serie">Tv Serie</option>
                        <option value="Drama">Drama</option>
                    </select>

                    <select 
                        name="Type" 
                        className="select select-bordered w-full" 
                        value={input.Type} 
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Type</option>
                        <option value="Movie">Movie</option>
                        <option value="Serie">Serie</option>
                    </select>

                    <Select
      label="Select Genre"
      placeholder="Select Genre"
      selectionMode="multiple"
      className="w-full"
      name="Genre"
      value={input.Genre}
      onChange={(e) => handleChange(e)}
    >
      {animals.map((animal) => (
        <SelectItem key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>

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
                <Button size='xxlg' onClick={handleSubmit}>Upload : {statusMessage()}</Button>
            </div>
        </div>
    );
};

export default Upload;


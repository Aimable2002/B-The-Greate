import multer from "multer";

import {v2 as cloudinary} from "cloudinary";
import Series from "../Modal/SeriesModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', folder: folderName },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        stream.end(buffer);
    });
};


export const uploadChanges = async (req, res) => {
    try {
        // console.log('Received text data:', req.body);
        // console.log('Received files:', req.files);

        const { movieId, movieTitle, trailor} = req.body;


        return !movieId || !movieTitle || !trailor 
            ? res.status(400).json({ error: 'MovieId and title are required', status: false })
            : await handleImageUpload(req, res, movieId);

    } catch (error) {
        console.log('Internal server error:', error);
        return res.status(500).json({ error: 'Internal server error', status: false });
    }
};

// Helper function to handle the image upload logic
const handleImageUpload = async (req, res, movieId) => {
    const checkMovie = await Series.findById(movieId);
    
    return !checkMovie 
        ? res.status(404).json({ error: 'Movie not found', status: false })
        : await processUpdate(req, res, movieId);
};

// Helper function to process the update
const processUpdate = async (req, res, movieId) => {
    const { movieTitle, trailor} = req.body;
    const updateData = { movieTitle, trailor };

    // Process images if they exist
    if (req.files && Object.keys(req.files).length > 0) {
        for (const [fieldName, files] of Object.entries(req.files)) {
            if (files[0]?.buffer) {
                const result = await uploadToCloudinary(files[0].buffer, 'profile_upload');
                
                fieldName === 'image1' && (updateData.SmallImage = result.secure_url);
                fieldName === 'image2' && (updateData.LargeImage = result.secure_url);
            }
        }
    }

    const updatedMovie = await Movies.findByIdAndUpdate(
        movieId,
        { $set: updateData },
        { new: true }
    );

    return res.status(200).json({
        message: 'Movie updated successfully',
        status: true,
        movie: updatedMovie,
    });
};






export const deleteMovie = async (req, res) => {
    const { movieId } = req.body;
    await Movies.findByIdAndDelete(movieId);
    return res.status(200).json({ message: 'Movie deleted successfully', status: true });
};
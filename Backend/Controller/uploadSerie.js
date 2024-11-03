import multer from "multer";

import {v2 as cloudinary} from "cloudinary";
import Movies from "../Modal/MoviesModel.js";
import Series from "../Modal/SeriesModel.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// cloudinary.config({
//     cloud_name: 'your_cloud_name',
//     api_key: 'your_api_key',
//     api_secret: 'your_api_secret',
// });

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

export const uploadSerie = async (req, res) => {
    try {
        console.log('Received text data:', req.body);
        console.log('Received files:', req.files);

        const { 
            Name, 
            Studio, 
            Production_Company, 
            Category, 
            Description, 
            Released_Date, 
            Trailor, 
            seasons,
            Genre,
            Translator,
            Director,
            Tags
        } = req.body

        if(!Name || !Genre || !Translator || !Director || !Tags || !Studio || !Production_Company || !Description || !Released_Date || !Category || !Trailor){
            return res.status(450).json({error : 'fill the field', status: false})
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(490).json({ error: 'No files were uploaded.', status:false });
        }

        const folderName = 'profile_upload';
        const uploadPromises = [];

        for (const key in req.files) {
            for (const file of req.files[key]) {
                if (file.buffer) {
                    console.log(`Preparing to upload: ${file.originalname}`);
                    uploadPromises.push(uploadToCloudinary(file.buffer, folderName));
                } else {
                    console.error(`Buffer not found for file: ${file.originalname}`);
                }
            }
        }

        const results = await Promise.all(uploadPromises);
        console.log('Upload Results:', results);

        if (results.length < 2) {
            return res.status(410).json({ error: 'Both images must be uploaded.', status: false });
        }

        const smallImageUrl = results[0].secure_url; 
        const largeImageUrl = results[1].secure_url;

        let parsedSeasons;
        try {
            parsedSeasons = JSON.parse(seasons);
        } catch (error) {
            return res.status(409).json({ 
                error: 'Invalid seasons data format', 
                status: false 
            });
        }

        const newSeries = new Series({
            movieTitle: Name,
            studio: Studio,
            productionCompany: Production_Company,
            description: Description,
            releasedDate: Released_Date,
            trailer: Trailor,
            Category: Category,
            seasons: parsedSeasons,
            Genre: Genre,
            Translator: Translator,
            Director: Director,
            Tags: Tags,
            smallImage: smallImageUrl,
            largeImage: largeImageUrl
        });
                
            await newSeries.save();
                
            return res.status(201).json({
                message: 'Images uploaded successfully',
                status: true,
                movie: newSeries, 
            });

    } catch (error) {
        console.log('Internal server error:', error);
        return res.status(500).json({ error: 'Internal server error', status: false});
    }
};

export const editChanges = async (req, res) => {
    try {
        // console.log('Received text data:', req.body);
        // console.log('Received files:', req.files);

        const { movieId, movieTitle, trailor, download } = req.body;


        return !movieId || !movieTitle || !trailor || !download
            ? res.status(400).json({ error: 'MovieId and title are required', status: false })
            : await handleImageUpload(req, res, movieId);

    } catch (error) {
        console.log('Internal server error:', error);
        return res.status(500).json({ error: 'Internal server error', status: false });
    }
};

// Helper function to handle the image upload logic
const handleImageUpload = async (req, res, movieId) => {
    const checkMovie = await Movies.findById(movieId);
    
    return !checkMovie 
        ? res.status(404).json({ error: 'Movie not found', status: false })
        : await processUpdate(req, res, movieId);
};

// Helper function to process the update
const processUpdate = async (req, res, movieId) => {
    const { movieTitle, trailor, download } = req.body;
    const updateData = { movieTitle, trailor, download };

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




export const getSeries = async (req, res) => {
    const series = await Series.find().sort({ createdAt: -1 });
    return res.status(200).json({ series });
};

export const addSeries = async (req, res) => {
    const { seriesId, seasons } = req.body;
    console.log('req.body :', req.body);

    const checkSeries = await Series.findById(seriesId);

    let parsedSeasons;
        try {
            parsedSeasons = JSON.parse(seasons);
        } catch (error) {
            return res.status(409).json({ 
                error: 'Invalid seasons data format', 
                status: false 
            });
        }

    return !seriesId || !seasons
        ? res.status(400).json({ error: 'SeriesId and seasons are required', status: false })
        : !checkSeries
        ? res.status(404).json({ error: 'Series not found', status: false })
        : await Series.findById(seriesId)
            ? await Series.findByIdAndUpdate(
                seriesId,
                { $push: { seasons: parsedSeasons } },
                { new: true }
              )
                ? res.status(200).json({ 
                    message: 'Seasons added successfully',
                    status: true 
                  })
                : res.status(500).json({ 
                    error: 'Failed to update series', 
                    status: false 
                  })
            : res.status(404).json({ 
                error: 'Series not found', 
                status: false 
              });

    
    

};

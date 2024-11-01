import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import Movies from "../Modal/MoviesModel.js";

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

export const uploadImage = async (req, res) => {
    try {
        console.log('Received text data:', req.body);
        console.log('Received files:', req.files);

        const {Name, Duration, Studio, Type, Production_Company, Category, Description, Released_Date, Trailor, Download } = req.body

        if(!Name || !Duration || !Studio || !Type || !Production_Company || !Description || !Released_Date || !Category || !Trailor || !Download ){
            return res.status(400).json({error : 'fill the field', status: false})
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.', status:false });
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
            return res.status(400).json({ error: 'Both images must be uploaded.', status: false });
        }

        // Assign small and large image URLs
        const smallImageUrl = results[0].secure_url; // Assuming first image is small
        const largeImageUrl = results[1].secure_url;

            const newMovie = new Movies({
                movieTitle: Name,
                Duration,
                Studio,
                ProductionCompany: Production_Company,
                Description,
                Released_date: Released_Date,
                Trailor,
                Download,
                Category,
                Type,
                SmallImage: smallImageUrl, // Correct assignment
                LargeImage: largeImageUrl
            });
                
            await newMovie.save();
                
            return res.status(201).json({
                message: 'Images uploaded successfully',
                status: true,
                movie: newMovie, // Optional: return the newly created movie document
            });

    } catch (error) {
        console.log('Internal server error:', error);
        return res.status(500).json({ error: 'Internal server error', status: false});
    }
};




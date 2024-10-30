import mongoose from "mongoose";


const moviesSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        require: true
    },
    Duration: {
        type: String,
        require: true,
    },
    Studio: {
        type: String,
        require: true
    },
    ProductionCompany: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true,
    },
    Released_date: {
        type: String,
        require: true
    },
    Trailor: {
        type: String,
        require: true
    },
    Download: {
        type: String,
        require: true,
    },
    Category: {
        type: String,
        require: true,
    },
    SmallImage: {
        type: String,
        require: true
    },
    LargeImage: {
        type: String,
        require: true
    },
},{timestamps: true})


const  Movies = mongoose.model("Movies", moviesSchema);

export default Movies;
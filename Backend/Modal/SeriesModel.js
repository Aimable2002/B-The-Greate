import mongoose from "mongoose";

// Define Episode schema
const episodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    releasedDate: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String,
        required: true
    }
}, { _id: false }); // Disable automatic ID for episodes

// Define Season schema
const seasonSchema = new mongoose.Schema({
    seasonNumber: {
        type: Number,
        required: true
    },
    episodes: [episodeSchema] // Array of episodes for each season
}, { _id: false }); // Disable automatic ID for seasons

// Define Series schema
const seriesSchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    studio: {
        type: String,
        required: true
    },
    productionCompany: {
        type: String,
        required: true
    },
    seasons: [seasonSchema], // Array of seasons
    description: {
        type: String,
        required: true
    },
    releasedDate: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    smallImage: {
        type: String,
        required: true
    },
    largeImage: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Series = mongoose.model("Series", seriesSchema);

export default Series;
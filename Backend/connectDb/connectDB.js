import mongoose from 'mongoose'


const connectDB = async() => {
    try{
        
        // const URL = process.env.URL
        const URL = 'mongodb+srv://webdev534:Bqnqdl5QUCAGVy7V@movie-cluster.6qb3b.mongodb.net/?retryWrites=true&w=majority&appName=Movie-Cluster'
        // console.log('Database URL:', URL);
        await mongoose.connect(URL)
        console.log('DB Connected')
    }catch(error){
        console.log('DB Connection fail :', error.message)
    }
}


export default connectDB
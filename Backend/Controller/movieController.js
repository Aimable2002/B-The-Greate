import Movies from "../Modal/MoviesModel.js"



export const getMovies = async (req, res) => {
    try{
        const getAllMovies = await Movies.find().sort({ createdAt: -1 })

        // console.log('all Movies :', getAllMovies)
        return res.status(200).json(getAllMovies)
    }catch(error){
        console.log('internal server error :', error)
        return res.status(500).json({error: 'internal server error'})
    }
}


import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetMovies = () => {
    const [loading, setLoading] = useState(false)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            setLoading(true);
            const res = await axios.get('http://localhost:3000/api/movies');
            const data = res.data;
      
            if (!data) {
              throw new Error('Missing data');
            }
    
            setMovies(data);
          } catch (error) {
            console.error('Error fetching movies:', error.response ? error.response.data : error.message);
          } finally {
            setLoading(false);
          }
        };
        
        fetchMovies();
      }, []);
      
    return {loading, movies}
}

export default useGetMovies
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useGetSeries = () => {
    
        const [loading, setLoading] = useState(false)
        const [series, setSeries] = useState([])
    
        const [updateStatus, setUpdateStatus] = useState(null)
    
        useEffect(() => {
            const fetchMovies = async () => {
              try {
                setLoading(true);
                const res = await axios.get('https://b-the-greate.onrender.com/api/series');
                const data = res.data;
          
                if (!data) {
                  throw new Error('Missing data');
                }
    
                if(data && data.status){
                  setUpdateStatus(data.status)
                }
        
                setSeries(data);
              } catch (error) {
                console.error('Error fetching movies:', error.response ? error.response.data : error.message);
              } finally {
                setLoading(false);
              }
            };
            
            fetchMovies();
          }, []);
          
        return {loading, series}
    
    
}

export default useGetSeries
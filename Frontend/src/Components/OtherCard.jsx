import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'
import useGetMovies from "../hook/useGetMovies";
import SkeletonColor from "../Skeleton/CardSkeleton";
// import { SkeletonColor } from '../Skeleton/CardSkeleton'
import useGetSeries from "../hook/useGetSeries";

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + '...' : str;
}

export   const ScrollCard = ({ genre }) => {


  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
        ...(movies?.filter(item => {
          // Handle Genre as string
          if (!item?.Genre) return false;
          // Split the genres and check if any match
          const genres = item.Genre.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        }) || []),
        ...(series?.series?.filter(item => {
          if (!item?.Genre) return false;
          const genres = item.Genre.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        }) || [])
      ];

  const navigate = useNavigate()
  
  
  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

  


  return (
    <>
      {isLoading  ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-[90vh] w-[95vw]">No Result Found</div> :  allContent.map((item, index) => (
        <Card   key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain  h-[200px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col  px-1">
            {/* <b>{item.movieTitle}</b>
            <p className="text-default-500">{item.Duration}</p> */}
            <div className="flex flex-row justify-between gap-4">
          <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
          <p className="text-default-500">{item.Duration}</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}


export   const BigScrollCard = ({genre}) => {
  

  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  // console.log('Movies:', movies);
  // console.log('Series:', series);
  // console.log('Genre:', genre);

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
        ...(movies?.filter(item => {
          // Handle Genre as string
          if (!item?.Genre) return false;
          // Split the genres and check if any match
          const genres = item.Genre.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        }) || []),
        ...(series?.series?.filter(item => {
          if (!item?.Genre) return false;
          const genres = item.Genre.split(',').map(g => g.trim().toLowerCase());
          return genres.includes(genre.toLowerCase());
        }) || [])
      ];


  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

  

  return (
    <>
      {isLoading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      { isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-[90vh] w-[95vw]">No Result Found</div> :  allContent.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full  object-contain h-[250px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col  px-1">
            {/* <b>{item.movieTitle}</b>
            <p className="text-default-500">{item.Duration}</p> */}
            <div className="flex flex-row justify-between gap-4">
          <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
          <p className="text-default-500">{item.Duration }</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
    </>
  );
}



export   const ndBigScrollCard = ({genre}) => {


  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()


  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
        ...(movies?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || []),
        ...(series?.series?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || [])
      ];


  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

//shadow="sm"
  return (
    <>
      {isLoading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-32 w-32">No Result Found</div> :  allContent.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col  px-1">
              {/* <b>{item.movieTitle}</b>
              <p className="text-default-500">{item.Duration}</p> */}
              <div className="flex flex-row justify-between gap-4">
          <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
          <p className="text-default-500">{item.Duration }</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
    </>
  );
}




export  const IpadScrollCard = () =>  {

  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
        ...(movies?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || []),
        ...(series?.series?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || [])
      ];


  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

  return (
    <>
      {isLoading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 hide-scrollbar sm:grid-cols-4">
      {isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-32 w-32">No Result Found</div> :  allContent.map((item, index) => (
        <Card  key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small self-start flex flex-col px-6">
          {/* <b>{item.movieTitle}</b>
          <p className="text-default-500">{item.Duration}</p> */}
          <div className="flex flex-row justify-between gap-4">
          <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
          <p className="text-default-500">{item.Duration}</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}





export  const PcScrollCard = () => {
  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
        ...(movies?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || []),
        ...(series?.series?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || [])
      ];


  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

  return (
    <>
      {isLoading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 hide-scrollbar sm:grid-cols-6">
      {isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-32 w-32">No Result Found</div> :  allContent.map((item, index) => (
        <Card key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small self-start flex flex-col px-2">
          {/* <b>{item.movieTitle}</b>
          <p className="text-default-500">{item.Duration}</p> */}
          <div className="flex flex-row justify-between gap-4">
          <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
          <p className="text-default-500">{item.Duration}</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}




export  const LargeScrollCard = () => {
  const { loading: moviesLoading, movies } = useGetMovies()
  const { loading: seriesLoading, series } = useGetSeries()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  // const allContent = [
  //   ...(movies?.map(movie => ({ ...movie, type: 'movie' })) || []),
  //   ...(series.series?.map(show => ({ ...show, type: 'series' })) || [])
  // ]

  const allContent = genre === 'All' 
    ? [
        ...(movies || []),
        ...(series?.series || [])
      ]
    : [
      
        ...(movies?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || []),
        ...(series?.series?.filter(item => item.Genre.toLowerCase().includes(genre.toLowerCase())) || [])
      ];


  const isLoading = moviesLoading || seriesLoading

  const getImageUrl = (item) => {
    // if (item.type === 'series') {
    //   return item.smallImage || item.SmallImage // handle both cases
    // }
    // return item.SmallImage
    return item.smallImage || item.SmallImage || item.largeImage || item.LargeImage || '';
  }

  return (
    <>
      {isLoading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 hide-scrollbar sm:grid-cols-8">
      {isLoading ? null : !isLoading && allContent.length === 0 ? <div className="skeleton h-32 w-32">No Result Found</div> :  allContent.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={getImageUrl(item)}
            />
          </CardBody>
          <CardFooter className="text-small self-start flex flex-col px-2">
          <div className="flex flex-row justify-between gap-4">
            <p className="text-default-500">{new Date(item.Released_date).getFullYear()}</p>
            <p className="text-default-500">{item.Duration}</p>
          </div>
          <b>{item.movieTitle}</b>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}



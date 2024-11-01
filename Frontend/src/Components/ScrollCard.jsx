import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'
import useGetMovies from "../hook/useGetMovies";
import SkeletonColor from "../Skeleton/CardSkeleton";
// import { SkeletonColor } from '../Skeleton/CardSkeleton'



export   const ScrollCard = () => {

  const {loading, movies } = useGetMovies() 

  const navigate = useNavigate()
  
  
  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }
  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {loading ? null : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> : movies.map((item, index) => (
        <Card   key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[200px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-6">
            <b>{item.movieTitle}</b>
            <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}


export   const BigScrollCard = () => {

  const {loading, movies } = useGetMovies()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {loading ? null  : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full  object-contain h-[250px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-6">
            <b>{item.movieTitle}</b>
            <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
    </>
  );
}



export   const ndBigScrollCard = () => {


  const {loading, movies } = useGetMovies()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }


//shadow="sm"
  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {loading ? null : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => handleNovigate(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-arround px-6">
            <b>{item.movieTitle}</b>
            <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
    </>
  );
}




export  const IpadScrollCard = () =>  {

  const {loading, movies } = useGetMovies()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {loading ? null : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> :  movies.map((item, index) => (
        <Card  key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-6">
          <b>{item.movieTitle}</b>
          <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}





export  const PcScrollCard = () => {
  const {loading, movies } = useGetMovies()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      {loading ? null : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> :  movies.map((item, index) => (
        <Card key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-2">
          <b>{item.movieTitle}</b>
          <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}




export  const LargeScrollCard = () => {
  const {loading, movies } = useGetMovies()

  const navigate = useNavigate()

  const handleNovigate = (id) => {

    console.log('_id :', id)
    localStorage.setItem('CM', JSON.stringify(id))
    navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)

  }

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-8">
      {loading ? null : !loading && movies.length === 0 ? <div className="skeleton h-32 w-32"></div> :  movies.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => handleNovigate(item)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.movieTitle}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-2">
          <b>{item.movieTitle}</b>
          <p className="text-default-500">{item.Duration}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
            )}
            </>
  );
}



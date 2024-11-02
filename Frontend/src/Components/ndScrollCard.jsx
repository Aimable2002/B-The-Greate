import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'
import useGetMovies from "../hook/useGetMovies";
import SkeletonColor from "../Skeleton/CardSkeleton";
// import { SkeletonColor } from '../Skeleton/CardSkeleton'

const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + '...' : str;
}

export   const ScrollCard = ({ movies, onImageClick }) => {

const {loading } = useGetMovies() 

const navigate = useNavigate()

const NewonImageClick = (id) => {
    console.log('clicked')
    localStorage.setItem('CM', JSON.stringify(id))
    onImageClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)
}

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">

      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> : movies.map((item, index) => (
        <Card   key={item._id} isPressable onPress={() => NewonImageClick(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain  h-[200px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
              onPress={() => NewonImageClick(item)}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-1">
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


export   const BigScrollCard = ({ movies, onImageClick }) => {

//   const {loading, movies } = useGetMovies()

const navigate = useNavigate()

const {loading} = useGetMovies()

const NewonImageClick = (id) => {
    console.log('clicked')
    localStorage.setItem('CM', JSON.stringify(id))
    onImageClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)
}

  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">

      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => NewonImageClick (item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full  object-contain h-[250px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-1">
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



export   const ndBigScrollCard = ({ movies, onImageClick }) => {


//   const {loading, movies } = useGetMovies()
  const {loading} = useGetMovies()

  const navigate = useNavigate()

  const NewonImageClick = (id) => {
    console.log('clicked')
    localStorage.setItem('CM', JSON.stringify(id))
    onImageClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // navigate(`/view/${id._id}sfddfdghfcsdcnchsdshudsfjj`)
}


  
  return (
    <>
      {loading ? (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <h1 className="text-white">Loading Movies...</h1>
                </div>
            ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">

      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => NewonImageClick(item)} className="bg-black border-none">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain  h-[350px]"
              style={{resizeMode: 'contain'}}
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-arround px-1">
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




export  const IpadScrollCard = () =>  {

  const navigate = useNavigate()

  return (
    <>
    {loading ? (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <h1 className="text-white">Loading Movies...</h1>
      </div>
  ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card  key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain h-[200px]"
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-1">
            {/* <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p> */}
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
  const navigate = useNavigate()

  return (
    <>
    {loading ? (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <h1 className="text-white">Loading Movies...</h1>
      </div>
  ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain h-[300px]"
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-1">
            {/* <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p> */}
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
  const navigate = useNavigate()

  return (
    <>
    {loading ? (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <h1 className="text-white">Loading Movies...</h1>
      </div>
  ) : (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-8">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={truncate(item.movieTitle, 20)}
              className="w-full object-contain h-[350px]"
              src={item.SmallImage}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-1">
            {/* <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p> */}
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



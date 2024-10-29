import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'
import useGetMovies from "../hook/useGetMovies";
import SkeletonColor from "../Skeleton/CardSkeleton";
// import { SkeletonColor } from '../Skeleton/CardSkeleton'



export   const ScrollCard = () => {

  const {loading, movies } = useGetMovies() 

  const navigate = useNavigate()
  
  // if(loading && movies.length !== 0){
  //   return ( 
  //     <SkeletonColor /> 
  //   )
  // }
  
  
// 
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 -z-10">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> : movies.map((item, index) => (
        <Card   key={item._id} isPressable onPress={() => navigate('card clicked')} className="bg-black border-none">
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
  );
}


export   const BigScrollCard = () => {

  const {loading, movies } = useGetMovies()

  // if(loading && movies.length !== 0){
  //   return ( 
  //     <SkeletonColor /> 
  //   )
  // }

  const navigate = useNavigate()

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => navigate('card clicked')} className="bg-black border-none">
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
  );
}



export   const ndBigScrollCard = () => {


  const {loading, movies } = useGetMovies()

  // if(loading && movies.length !== 0){
  //   return ( 
  //     <SkeletonColor /> 
  //   )
  // }


//shadow="sm"
  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {loading ? <SkeletonColor /> : movies.length === 0 ? <h1>??</h1> :  movies.map((item, index) => (
        <Card  key={item._id} isPressable onPress={() => navigate('card clicked')} className="bg-black border-none">
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
  );
}




export  const IpadScrollCard = () =>  {

  const navigate = useNavigate()

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card  key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-contain h-[200px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small flex flex-col justify-around px-6">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}





export  const PcScrollCard = () => {
  const navigate = useNavigate()

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      {list.map((item, index) => (
        <Card key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-contain h-[300px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-2">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}




export  const LargeScrollCard = () => {
  const navigate = useNavigate()

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-8">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => navigate(item.link)} className="bg-black">
          <CardBody className="overflow-visible p-0">
            <Image
              // radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-contain h-[350px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between px-2">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}



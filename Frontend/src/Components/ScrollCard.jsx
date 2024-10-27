// import React from 'react'
// import OIPImage from '../assets/OIP.jpg'
// import Image2 from '../assets/download (2).jpg'
// import Image3 from '../assets/OIP (5).jpg'
// import Image4 from '../assets/OIP.jpg'


// export   const ScrollCard = () => {
//   return(
//     <div className="flex overflow-x-auto space-x-2 bg-purple-700 text-purple-400"> {/* Enable horizontal scrolling */}
//       <img 
//         src={OIPImage}
//         alt="Movie Cover"
//         className="w-[50%] h-auto rounded" 
//       />
//       <img 
//         src={Image2}
//         alt="Movie Cover"
//         className="w-[50%] h-auto rounded" 
//       />
//       <img 
//         src={Image3}
//         alt="Movie Cover"
//         className="w-[50%] h-auto rounded" 
//       />
//       <img 
//         src={Image4}
//         alt="Movie Cover"
//         className="w-[50%] h-auto rounded" 
//       />
//       {/* You can add more images here if needed */}
//     </div>
//   )
// }




// export  const IpadScrollCard = () =>  {
//   return(
//     <div className="flex overflow-x-auto space-x-2 bg-amber-500"> {/* Enable horizontal scrolling */}
//       <img 
//         src={OIPImage}
//         alt="Movie Cover"
//         className="w-[50%] h-[200px] rounded" 
//       /> 
//       <img 
//         src={Image2}
//         alt="Movie Cover"
//         className="w-[50%] h-[200px] rounded" 
//       />
//       <img 
//         src={Image3}
//         alt="Movie Cover"
//         className="w-[50%] h-[200px] rounded" 
//       />
//       <img 
//         src={Image4}
//         alt="Movie Cover"
//         className="w-[50%] h-[200px] rounded" 
//       />
//       {/* You can add more images here if needed */}
//     </div>
//   )
// }




// export  const PcScrollCard = () => {
//   return(
//     <div className="flex overflow-x-auto space-x-2"> {/* Enable horizontal scrolling */}
//       <img 
//         src={OIPImage}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image2}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image3}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image4}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       {/* You can add more images here if needed */}
//     </div>
//   )
// }



// export  const LargeScrollCard = () => {
//   return(
//     <div className="flex overflow-x-auto space-x-2 "> {/* Enable horizontal scrolling */}
//       <img 
//         src={OIPImage}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image2}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image3}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       <img 
//         src={Image4}
//         alt="Movie Cover"
//         className="w-[30%] h-[500px] rounded" 
//       />
//       {/* You can add more images here if needed */}
//     </div>
//   )
// }

import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import OrangeImg from "../assets/download (1).jpg";
import TangerineImg from "../assets/download (3).jpg";
import RaspberryImg from "../assets/download (2).jpg";
import LemonImg from "../assets/download.jpg";
import AvocadoImg from "../assets/movie.jpg";
import Lemon2Img from "../assets/OIP (2).jpg";
import BananaImg from "../assets/OIP (4).jpg";
import WatermelonImg from "../assets/OIP.jpg";
import {useNavigate} from 'react-router-dom'

export   const ScrollCard = () => {

  const navigate = useNavigate()
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
      link: '/view'
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
      link: '/view'
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 -z-10">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => navigate(item.link)}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[200px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}


export   const BigScrollCard = () => {

  const navigate = useNavigate()
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
      link: '/view'
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
      link: '/view'
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log('Big Phones')}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[250px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}



export   const ndBigScrollCard = () => {

  const navigate = useNavigate()
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
      link: '/view'
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
      link: '/view'
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
      link: '/view'
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
      link: '/view'
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 ">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log('Large Phones')}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[350px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}




export  const IpadScrollCard = () =>  {
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed ipad")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[200px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}





export  const PcScrollCard = () => {
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-6">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[300px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}




export  const LargeScrollCard = () => {
  const list = [
    {
      title: "Orange",
      img: OrangeImg,
      price: "2hrs",
    },
    {
      title: "Tangerine",
      img: TangerineImg,
      price: "1hr",
    },
    {
      title: "Raspberry",
      img: RaspberryImg,
      price: "2hrs",
    },
    {
      title: "Lemon",
      img: LemonImg,
      price: "1hr",
    },
    {
      title: "Avocado",
      img: AvocadoImg,
      price: "3hrs",
    },
    {
      title: "Lemon 2",
      img: Lemon2Img,
      price: "1hr",
    },
    {
      title: "Banana",
      img: BananaImg,
      price: "1hr",
    },
    {
      title: "Watermelon",
      img: WatermelonImg,
      price: "2hrs",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-8">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[350px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}



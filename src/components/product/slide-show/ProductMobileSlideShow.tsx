"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./ProductSlideShow.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

interface Props {
 images: string[];
 title: string;
 className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
 return (
  <div className={className}>
   <Swiper
    style={{
     width: "100vw",
     height: "500px",
    }}
    pagination
    autoplay={{
     delay: 2500,
    }}
    modules={[FreeMode, Navigation, Autoplay]}
    className='mySwiper2'
   >
    {images.map((image) => (
     <SwiperSlide key={image}>
      <Image
       width={600}
       height={500}
       src={`/products/${image}`}
       alt={title}
       className='object-fill'
       priority
      />
     </SwiperSlide>
    ))}
   </Swiper>
  </div>
 );
};

// https://codesandbox.io/p/sandbox/k3cyyc

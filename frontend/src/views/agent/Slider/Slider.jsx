import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';


const Slider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='relative w-full h-full'>
                <img src="/post1.jpg" className='w-full relative h-full object-contain' alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='relative w-full h-full'>
                <img src="/astha2.jpg" className='w-full relative h-full object-contain' alt="" />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='relative w-full h-full'>
                <img src="/singapor1.jpg" className='w-full relative h-full object-contain' alt="" />
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default Slider
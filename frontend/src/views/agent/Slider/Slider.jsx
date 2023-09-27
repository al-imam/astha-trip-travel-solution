import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    (async () => setAds((await axios.get("/api/admin/ads").catch(() => ({ data: [] }))).data))();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {ads.map((ad) => (
          <SwiperSlide className="my-auto flex">
            <div className=" h-full w-full">
              <img src={`/api/admin/ads/get/${ad.url}`} className="h-full w-full object-fill" alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;

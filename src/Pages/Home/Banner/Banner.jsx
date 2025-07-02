import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Images
import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
import banner3 from "../../../assets/banner3.jpg";

const Banner = () => {
  const slides = [
    {
      img: banner1,
      headline: "Up to 50% OFF",
      subtext: "On Electronics & Gadgets",
    },
    {
      img: banner2,
      headline: "New Arrival",
      subtext: "Industrial Machinery & Tools",
    },
    {
      img: banner3,
      headline: "Bulk Fashion Deals",
      subtext: "Save Big on Apparel Orders",
    },
  ];

  return (
    <div className="relative w-full max-h-[70vh] overflow-hidden">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[50vh] md:h-[65vh] lg:h-[70vh]">
              <img
                src={slide.img}
                alt={`Banner Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
                <h2 className="text-2xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                  {slide.headline}
                </h2>
                <p className="text-base md:text-2xl drop-shadow-md">
                  {slide.subtext}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;

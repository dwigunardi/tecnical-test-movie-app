"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MoviePopular } from "@/types/movieType";
function SliderCarousel({
  dataMovie,
  dataGenre,
}: {
  dataMovie: MoviePopular[];
  dataGenre: { id: number; name: string }[];
}) {
  const potongTeks = (teks: string) => {
    if (teks.length > 400) {
      return teks.substring(0, 400) + "...";
    } else {
      return teks;
    }
  };

  return (
    <Swiper
      pagination={{
        type: "progressbar",
        clickable: true,
        dynamicBullets: true,
        renderProgressbar(progressbarFillClass) {
          return '<span class="' + progressbarFillClass + '"></span>';
        },
      }}
      slidesPerView={1}
      navigation={true}
      modules={[Pagination, Navigation, Autoplay]}
      loop
      autoplay={{ delay: 3000 }}
      className="mySwiper h-[600px] w-full"
    >
      {dataMovie.map((movie: MoviePopular) => (
        <SwiperSlide key={movie.id} style={{ position: "relative" }}>
          <div className="swiper-lazy-preloader"></div>
          <Image
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            fetchPriority="auto"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-25"></div>
          <div className="absolute top-[40%] left-16">
            {movie.genre_ids.map((genre: any, idx) => (
              <Button key={idx} color="primary" className="mr-2">
                {
                  dataGenre.filter(
                    (item: { id: number; name: string }) => item.id === genre
                  )[0].name
                }
              </Button>
            ))}
            <h1 className="text-3xl font-bold mt-2">{movie.title}</h1>
            <div className="mt-2 w-1/2">
              <p className="text-lg ">{potongTeks(movie.overview)}</p>
            </div>
            <Button
              color="primary"
              endContent={<FaCircleArrowRight />}
              className="mt-5"
            >
              See More Info
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SliderCarousel;

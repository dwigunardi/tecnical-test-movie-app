"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import Image from "next/image";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaCircleArrowRight } from "react-icons/fa6";
import { MoviePopular } from "@/types/movieType";
import { appConfig } from "@/config/appConfig";
import ModalMovie from "../modal/movieModal";
function SliderCarousel({
  dataMovie,
  dataGenre,
}: {
  dataMovie: MoviePopular[];
  dataGenre: { id: number; name: string }[];
}) {
  const [modalData, setModalData] = useState<any>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [youtubeData, setYoutubeData] = useState<any>({
    results: [],
    message: "",
    id: "",
  });

  const [message, setMessage] = useState<string>("");

  const potongTeks = (teks: string) => {
    if (teks.length > 400) {
      return teks.substring(0, 400) + "...";
    } else {
      return teks;
    }
  };
  const handleModal = async  (data: MoviePopular) => {
    try {
      const controller = new AbortController();
      setModalData(data);
      const request = await fetch(
        `${appConfig.apiUrl}/movie/${data?.id}/videos`,
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            'accept': "application/json",
            'Authorization': `Bearer ${appConfig.appAccessToken}`,
          }
        }
      )
      const res = await request.json();
      setMessage("succes");
      const filteredData = await res.results.find((item: any) => {
        return item.type === "Trailer";
      })
      setYoutubeData(filteredData);
      onOpen();
    }catch (error) {
      if (error instanceof Error) {
        setMessage("The request was aborted");
      }
    }
  }

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
              onPress={() => handleModal(movie)}
            >
              See More Info
            </Button>
          </div>
        </SwiperSlide>
      ))}
      <ModalMovie
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        movieData={modalData}
        genreData={dataGenre}
        youtubeData={youtubeData}
      />
    </Swiper>
  );
}

export default SliderCarousel;

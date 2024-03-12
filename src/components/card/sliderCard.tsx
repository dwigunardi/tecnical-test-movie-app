"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay, Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MovieCard from "./movieCard";
import { MoviePopular } from "@/types/movieType";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalMovie from "../modal/movieModal";
import { appConfig } from "@/config/appConfig";

export default function SliderCard({
  movies,
  dataGenre,
}: {
  movies: MoviePopular[];
  dataGenre: { id: number; name: string }[];
}) {
  const swiper = useSwiper();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [youtubeData, setYoutubeData] = useState<any>({
    results: [],
    message: "",
    id: "",
  });
  const [message, setMessage] = useState<string>("");
  const [modalData, setModalData] = useState<any>({});
  const handleModal = async (data: any, openModal: () => void) => {
    try {
      const controller = new AbortController();
      setModalData(data);
      const request = await fetch(
        `${appConfig.apiUrl}/movie/${data?.id}/videos`,
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${appConfig.appAccessToken}`,
          },
        }
      );
      const res = await request.json();
      setMessage("succes");
      const filteredData = await res.results.find((item: any) => {
        return item.type === "Trailer";
      })
      setYoutubeData(filteredData);
      onOpen();
    } catch (error) {
      if (error instanceof Error) {
        setMessage("The request was aborted");
      }
    }
  };
  console.log(youtubeData, "youtubeData");
  return (
    <div className="swiper-container">
      <Swiper
        modules={[Pagination, Navigation, Autoplay, Scrollbar]}
        spaceBetween={20}
        slidesPerView={4}
        grabCursor={true}
        navigation
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="swiper-slide">
            <MovieCard
              movie={movie}
              dataGenre={dataGenre}
              handleModal={handleModal}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ModalMovie
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        movieData={modalData}
        genreData={dataGenre}
        youtubeData={youtubeData}
      />
    </div>
  );
}

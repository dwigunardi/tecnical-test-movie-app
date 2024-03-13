"use client";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// import required modules
import { Navigation, Autoplay, Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MovieCard from "./movieCard";
import { MoviePopular } from "@/types/movieType";
import { Pagination, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ModalMovie from "../modal/movieModal";
import { appConfig } from "@/config/appConfig";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
export default function SliderCard({
  movies,
  dataGenre,
  query,
  currentPage,
  totalResults,
  totalPage,
  typePage,
}: {
  movies: MoviePopular[];
  dataGenre: { id: number; name: string }[];
  query?: string;
  currentPage?: number | string | undefined;
  totalResults?: number;
  totalPage?: number;
  typePage?: string;
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
  const handleModal = async (data: any) => {
    try {
      const controller = new AbortController();
      setModalData(data);
      if (typePage === "movie") {
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
        });
        setYoutubeData(filteredData);
        onOpen();
      }else if(typePage === "series"){
        const request = await fetch(
          `${appConfig.apiUrl}/tv/${data?.id}/videos`,
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
        });
        setYoutubeData(filteredData);
        onOpen();
      }
      
    } catch (error) {
      if (error instanceof Error) {
        setMessage("The request was aborted");
      }
    }
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const handlePage = (page: number) => {
    if (page && typePage === "movie") {
      params.set("page", page.toString());
    }else if(page && typePage === "series"){
      params.set("pageSeries", page.toString());
    } else {
      params.delete("page");
      params.delete("pageSeries");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Navigation, Autoplay, Scrollbar]}
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
              typeData={typePage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mx-auto flex justify-center my-3">
        <Pagination
          total={totalPage || 1}
          initialPage={Number(currentPage) || 1}
          showControls
          loop
          onChange={handlePage}
        />
      </div>

      <ModalMovie
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        movieData={modalData}
        genreData={dataGenre}
        youtubeData={youtubeData}
        typePage={typePage}
      />
    </div>
  );
}

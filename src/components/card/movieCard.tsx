"use client";
import {
  Button,
  Card,
  CardFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { MoviePopular } from "@/types/movieType";
import dynamic from "next/dynamic";
// import ModalMovie from "../modal/movieModal";

const ModalMovie = dynamic(() => import("../modal/movieModal"), {
  ssr: false,
})

export default function MovieCard({
  movie,
  dataGenre,
  handleModal,
  typeData = "movie"
}: {
  movie: MoviePopular;
  dataGenre: { id: number; name: string }[];
  handleModal: any,
  typeData?: string
}) {
  const [hover, setHover] = useState(false);
  const {onOpen} = useDisclosure();
  const [modalData, setModalData] = useState<any>({})
  const sendToUpComponent = (movie: MoviePopular) => {
      handleModal(movie)
      onOpen()
  }
  
  return (
    <div>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full group relative m-0 flex h-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg cursor-auto"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`${
            hover
              ? "absolute inset-0 bg-primary w-full h-full z-50 opacity-30"
              : "hidden"
          } `}
        ></div>
        <Button
          className={`${
            hover ? "absolute top-[50%] left-[34%] z-50" : "hidden"
          }`}
          color="primary"
          onPress={() => sendToUpComponent(movie)}
        >
          See More Info
        </Button>
        <Image
          alt={movie.title}
          className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110 group-hover:opacity-70"
          height={"100%"}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          removeWrapper
          width={"100%"}
        />
        <div className="absolute bg-center w-20 h-20 bg-primary top-0 right-0  z-10 rounded-bl-full">
          <div className="my-auto flex flex-col justify-start items-center w-full h-full">
            <div className="text-end text-2xl rotate-[45deg] ml-10">
              <GoStarFill />
            </div>
            <p className="text-end text-2xl rotate-[45deg]">
              {movie.vote_average.toFixed(2)}
            </p>
          </div>
        </div>
        <CardFooter
          className={`justify-start ${
            hover ? "bg-primary" : "before:bg-black"
          } border-white/20 border-1 overflow-visible py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10`}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-start items-center gap-2">
              <p className="text-base text-white/80 text-wrap">{movie.title}</p>
              <p className="text-base text-white/80 text-wrap"></p>
            </div>
            <div className="flex justify-between items-center gap-2">
              {movie.genre_ids.map((genre, idx) => (
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                  key={idx}
                >
                  { typeData == "movie" ?
                    dataGenre.filter(
                      (item: { id: number; name: string }) => item.id === genre
                    )[0]?.name
                  : dataGenre.filter(
                    (item: { id: number; name: string }) => item.id === genre
                  )[0]?.name
                  }
                </Button>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

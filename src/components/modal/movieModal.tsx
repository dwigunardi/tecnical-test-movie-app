"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MoviePopular } from "@/types/movieType";
import { appConfig } from "@/config/appConfig";
import LoadingRoute from "../loadingRoute";
import { BsStar, BsStarFill } from "react-icons/bs";

export default function ModalMovie({
  isOpen,
  onOpenChange,
  onOpen,
  movieData,
  genreData,
  youtubeData,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onOpen: () => void;
  movieData?: MoviePopular;
  genreData: { id: number; name: string }[];
  youtubeData?: any;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" scrollBehavior="inside" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {/* {movieData?.title} */}
              </ModalHeader>
              <ModalBody>
                <Suspense
                  fallback={<LoadingRoute height={"600px"} width={"full"} />}
                >
                  <iframe
                    width="100%"
                    height="600px"
                    src={`https://www.youtube.com/embed/${youtubeData.key}`}
                    title={`${movieData?.title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </Suspense>
                <div className="mt-5 flex flex-col gap-3">
                  <h1>{movieData?.title}</h1>
                  <p>Releases Date : {movieData?.release_date}</p>
                  <div className="flex justify-start items-center gap-2"> <p>Rating : {movieData?.vote_average.toFixed(2)} </p><span className="text-yellow-300"><BsStarFill /></span></div>
                  <div className="flex justify-start items-center gap-2">
                    {movieData?.genre_ids.map((genre, idx) => (
                      <Button
                        className="text-tiny text-white bg-black/20"
                        variant="flat"
                        color="default"
                        radius="lg"
                        size="sm"
                        key={idx}
                      >
                        {genreData.filter(
                            (item: { id: number; name: string }) =>
                              item.id === genre
                          )[0].name
                        }
                      </Button>
                    ))}
                  </div>
                  <p>{movieData?.overview}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

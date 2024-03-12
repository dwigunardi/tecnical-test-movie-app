
import LoadingRoute from "@/components/loadingRoute";
import PageTitle from "@/components/pageTittle";
import SliderCarousel from "@/components/slider/sliderCarousel";
import { GetGenreList } from "@/repository/getGenreList";
import { GetNowPlay } from "@/repository/getNowPlay";
import { GetPopular } from "@/repository/getPopular";
import { MovieApi, MoviePopular } from "@/types/movieType";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SliderCard = dynamic(() => import("@/components/card/sliderCard"), {
    ssr: false,
});

export default async function Home({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: string | number;
}) {
  const movieData: MovieApi = await GetPopular({
    limit: 10,
    page: currentPage || 1,
  });
  const movieNow: MovieApi = await GetNowPlay({
    limit: 10,
    page: currentPage || 1,
  });
  const genreList = await GetGenreList();

  return (
    <main>
      <SliderCarousel
        dataMovie={movieNow?.results}
        dataGenre={genreList?.genres}
      />
      <PageTitle title="Latest" />
      <div className="mt-10">
        <div className="container">
          <Suspense fallback={<LoadingRoute height={"400px"} width={"full"} />}>
            <SliderCard
              movies={movieData?.results}
              dataGenre={genreList?.genres}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

import LoadingRoute from "@/components/loadingRoute";
import PageTitle from "@/components/pageTittle";
import SliderCarousel from "@/components/slider/sliderCarousel";
import { GetGenreListMovie, GetGenreListTV } from "@/repository/getGenreList";
import { GetNowPlay } from "@/repository/getNowPlay";
import { GetPopular } from "@/repository/getPopular";
import { GetSeriesPopular } from "@/repository/getSeriesPopular";
import { MovieApi, MoviePopular } from "@/types/movieType";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SliderCard = dynamic(() => import("@/components/card/sliderCard"), {
  ssr: false,
});

export default async function Home({
  query,
  currentPage,
  currentPageSeries,
}: {
  query?: string;
  currentPage?: string | number;
  currentPageSeries?: string | number;
}) {
  const movieData: MovieApi = await GetPopular({
    limit: 10,
    page: currentPage || 1,
  });
  const movieNow: MovieApi = await GetNowPlay({
    limit: 10,
    page: 1,
  });
  const genreListMovie = await GetGenreListMovie();
  const genreListTv = await GetGenreListTV();
  const tvSeries: MovieApi = await GetSeriesPopular({
    limit: 10,
    page: currentPageSeries || 1,
  });

  return (
    <main>
      <SliderCarousel
        dataMovie={movieNow?.results}
        dataGenre={genreListMovie?.genres}
      />
      {query ? (
        <div className="mt-10 container">
          <PageTitle title={`Search: ${query}`} />

        </div>
      ) : (
        <div>
          <PageTitle title="Latest Movie" />
          <div className="mt-10">
            <div className="container">
              <Suspense
                fallback={<LoadingRoute height={"400px"} width={"full"} />}
              >
                <SliderCard
                  movies={movieData?.results}
                  dataGenre={genreListMovie?.genres}
                  totalPage={
                    movieData?.total_pages > 499 ? 499 : movieData?.total_pages
                  }
                  query={query}
                  totalResults={movieData?.total_results}
                  currentPage={currentPage}
                  typePage="movie"
                />
              </Suspense>
            </div>
          </div>
          <PageTitle title="Latest TV Series" />
          <div className="mt-10">
            <div className="container">
              <Suspense
                fallback={<LoadingRoute height={"400px"} width={"full"} />}
              >
                <SliderCard
                  movies={tvSeries?.results}
                  dataGenre={genreListTv?.genres}
                  totalPage={
                    tvSeries?.total_pages > 499 ? 499 : tvSeries?.total_pages
                  }
                  query={query}
                  totalResults={tvSeries?.total_results}
                  currentPage={currentPageSeries}
                  typePage="series"
                />
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

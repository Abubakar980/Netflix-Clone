import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
import { useContentStore } from "../store/content";
import MovieSlider from "../MovieSlider/MovieSlider";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  // console.log("Trending Content:", trendingContent);
  const {contentType} = useContentStore();

  if (!trendingContent) {
    <div className="h-screen text-white relative">
      <Navbar/>
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
    </div>
  }

  return (
    <>
    <div className="relative bg-cover min-h-screen text-white p-4 px-0 overflow-x-hidden">
      <Navbar />

      {/* Background Image */}
      <img
        src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
        alt="Hero Img"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10" />

      {/* Gradient Overlay */}
      <div className="absolute w-full h-full top-0 bg-gradient-to-b from-black via-transparent to-transparent -z-10" />

      {/* Content Layer */}
      <div className="relative mt-[3cm] z-20 flex flex-col justify-center h-full">
        <div className="max-w-2xl px-8 md:px-16 lg:px-32 text-left">
          <h1 className="mt-4 w-[17cm] text-6xl font-extrabold text-balance">
            {trendingContent?.title || trendingContent?.name}
          </h1>
          <p className="mt-2 text-lg">
            {trendingContent?.release_date?.split("-")[0] ||
              trendingContent?.first_air_date?.split("-")[0]}{" "}
            | {trendingContent?.adult ? "18+" : "PG-13"}
          </p>

          <p className="mt-4 text-lg">
            {trendingContent?.overview.length > 200
              ? trendingContent?.overview.slice(0, 200) + "..."
              : trendingContent?.overview}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 px-8 md:px-16 lg:px-32 flex gap-4">
          <Link
            to={`/watch/${trendingContent?.id}`}
            className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded flex items-center"
          >
            <Play className="size-6 mr-2 fill-black" /> Play
          </Link>
          <Link
            to={`/content/${trendingContent?.id}`}
            className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
          >
            <Info className="size-6 mr-2" /> More Info
          </Link>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-10 bg-black py-10">
      {contentType === "movie" ? (
        MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
      ):(
        TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
      )}
    </div>
    </>
  );
};

export default HomeScreen;

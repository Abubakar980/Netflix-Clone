import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";

const HomeScreen = () => {
  return (
    <div className="bg-cover min-h-screen text-white p-4 overflow-x-hidden relative">
      <Navbar />
      <img
        src="/extraction.jpg"
        alt="Hero Img"
        className="absolute top-0 left-0 w-full h-full object-cover -z-50"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
        aria-hidden="true"
      >
        <div className="flex flex-col justify-center h-full">
          {/* Gradient Overlay */}
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 -z-10"></div>

          {/* Content container aligned vertically center and left */}
          <div className="max-w-2xl px-8 md:px-16 lg:px-32 text-left z-10">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">Extraction</h1>
            <p className="mt-2 text-lg">2014 | 18+</p>
            <p className="mt-4 text-lg">
              A former black ops mercenary's mission to rescue an Indian crime lord's kidnapped son in Dhaka, Bangladesh goes awry when he is double-crossed.
            </p>
          </div>

          <div className="flex mt-8">
            <Link to="/watch/123" className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center">
            <Play className="size-6 mr-2 fill-black"/>Play
            </Link>
            <Link to="/watch/123" className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center">
            <Info className="size-6 mr-2"/>More Info
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeScreen;




// continue from 4:25:22
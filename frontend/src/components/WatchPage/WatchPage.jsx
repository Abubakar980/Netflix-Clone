import { Link, useParams } from 'react-router-dom';
import { useContentStore } from '../store/content';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../../utils/constants';
import { formatReleaseDate } from '../../utils/dateFunction';
import WatchPageSkeleton from '../Skeletons/WatchPageSkeleton';



const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        setTrailers([]);
        console.error("Error fetching trailers:", error);
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        setSimilarContent([]);
        console.error("Error fetching similar content:", error);
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        console.log("Error fetching content details:", error);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };

  // Smooth scroll function
  const smoothScroll = (element, amount, duration = 400) => {
    if (!element) return;
    const start = element.scrollLeft;
    const end = start + amount;
    const change = end - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = start + change * easeInOutQuad(progress);
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      smoothScroll(sliderRef.current, -sliderRef.current.offsetWidth);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      smoothScroll(sliderRef.current, sliderRef.current.offsetWidth);
    }
  };

  if(loading){
    return(

      <div className='min-h-screen bg-black p-10'>
        <WatchPageSkeleton/>
    </div>
    )
  }

  if(!content){
    return (
      <div className='h-screen bg-black text-white'>
        <div className='max-w-6xl mx-auto'>
        <Navbar />
        <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
        <h2 className='text-2xl sm:text-5xl font-bold text-balance'>
          Content not found 😥
        </h2>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='mx-auto container px-4 py-8 h-full'>
        <Navbar />

        {trailers.length > 0 && (
          <div className='flex justify-between items-center mb-4'>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
          {trailers.length > 0 ? (
            <ReactPlayer
              controls
              width="100%"
              height="100%"
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          ) : (
            <h2 className='text-xl text-center mt-5'>
              No trailers available for{" "}
              <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
            </h2>
          )}
        </div>

        {/* Movie Detail */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
            <p className='mt-2 text-lg'>
              {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className='text-red-600'>18+</span>
              ) : (
                <span className='text-green-600'>PG | 13</span>
              )}
            </p>
            <p className='mt-4 text-lg'>{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster"
            className='max-h-[600px] rounded-md'
          />
        </div>

        {/* Similar Content */}
        {similarContent.length > 0 && (
          <div className='mt-12 max-w-6xl mx-auto relative group'>
            <h3 className='text-3xl font-bold mb-4'>Similar Movies/TV Shows</h3>

            <button
              className='absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-red-600 text-white rounded-full flex items-center justify-center'
              onClick={scrollLeft}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={24} />
            </button>

            <div
              ref={sliderRef}
              className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4'
              style={{ scrollBehavior: 'smooth' }}
            >
              {similarContent.map((item) => {
                if(content.poster_path === null) return null
                
                return(  
                <Link key={item.id} to={`/watch/${item.id}`} className="w-52 flex-none">
                  <img
                    src={SMALL_IMG_BASE_URL + item.poster_path}
                    alt={item.title || item.name}
                    className='w-full h-auto rounded-md'
                  />
                  <h4 className='mt-2 text-lg font-semibold'>{item.title || item.name}</h4>
                </Link>
                )
              })}
            </div>

            <button
              className='absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer bg-red-600 text-white rounded-full flex items-center justify-center'
              onClick={scrollRight}
              aria-label="Scroll Right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default WatchPage;

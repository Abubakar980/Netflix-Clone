import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formatContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/${contentType}/${category}`
        );
        const data = res?.data?.content || [];
        setContent(data);
      } catch (err) {
        console.error("Error fetching content:", err);
        setContent([]);
      }
    };

    getContent();
  }, [contentType, category]);

  const smoothScroll = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;
    const start = container.scrollLeft;
    const end = direction === "right" ? start + scrollAmount : start - scrollAmount;
    const duration = 500; // ms
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      container.scrollLeft = start + (end - start) * ease;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const scrollLeft = () => smoothScroll("left");
  const scrollRight = () => smoothScroll("right");

  return (
    <div
      className="text-white bg-black relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formatContentType}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Movie Image"
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <p className="mt-2 text-center">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black/80 bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black/80 bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;

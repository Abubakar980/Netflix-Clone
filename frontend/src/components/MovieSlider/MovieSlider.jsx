import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import axios from "axios";


const MovieSlider = ({category}) => {
    const {contentType} = useContentStore()
    const [content, setContent] = useState([]);

    const formattedCategoryName = 
    category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formatContentType = contentType === "movie" ? "Movies" : "TV Shows";
    

   useEffect(() => {
  const getContent = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/${contentType}/${category}`);
      console.log("API Response:", res); // Debug log
      const data = res?.data?.content || [];
      setContent(data);
    } catch (err) {
      console.error("Error fetching content:", err);
      setContent([]);
    }
  };

  getContent();
}, [contentType, category]);




  return (
    <div className="text-white bg-black relative px-5 md:px-20">
      <h2 className="mb-4 text-2xl font-bold">
      {formattedCategoryName} {formatContentType}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll">
        {content.map((item)=>(
            <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
            <div className="rounded-lg overflow-hidden">
                <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="Movie Image" 
                className="transition-transform duration-300 ease-in-out group-hover:scale-125"/>
            </div>
            <p className="mt-2 text-center">{item.title||item.name}</p>
            </Link>
        ))}
      </div>
    </div>

    
  )
} 

export default MovieSlider




// continue from here
// 5:00:00
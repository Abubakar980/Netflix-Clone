import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";


function formatDate(dateString){
  const date = new Date(dateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`; // e.g., "Jan 1, 2023"
}

export const SearchHistoryPage = () => {

  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(()=>{
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/search/history",{
    withCredentials: true, // ✅ IMPORTANT
  });
        console.log(res.data.content);
        
        setSearchHistory(res.data.content);
      } catch (error) {
        console.log("Error fetching search history:", error);
        setSearchHistory([]);
      }
    }
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/search/history/${entry.id}`,{
    withCredentials: true, // ✅ IMPORTANT
  });
      setSearchHistory(searchHistory.filter((item)=> item.id !== entry.id)) 
    } catch (error) {
      toast.error("Error deleting search history entry");
      console.log("Error deleting search history entry:", error);
      
    }
  }

  if(searchHistory?.length === 0) {
    return(
      <div className="bg-black min-h-screen text-white">
        <Navbar/>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No Search History Found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
  <div className="bg-black text-white min-h-screen">
    <Navbar />
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Search History</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchHistory?.map((entry) => (
          <div key={entry.id} className="bg-gray-900 p-4 rounded-lg flex items-center shadow-md">
            <img
              src={SMALL_IMG_BASE_URL + entry.image}
              alt="History Thumbnail"
              className="size-16 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col flex-grow">
              <span className="text-white text-lg font-semibold">{entry.title}</span>
              <span className="text-gray-400 text-sm">{formatDate(entry.createdAt)}</span>
            </div>

            <span
              className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-2 
              ${entry.searchType === "movie"
                  ? "bg-red-600"
                  : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}>
              {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
            </span>

            <Trash
              className="size-5 ml-4 cursor-pointer hover:scale-110 hover:text-red-600 transition-all"
              onClick={() => handleDelete(entry)}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

}

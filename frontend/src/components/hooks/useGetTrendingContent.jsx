import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/${contentType}/trending`
        );
        setTrendingContent(res.data.content);
      } catch (err) {
        console.error("Error fetching trending content:", err);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;

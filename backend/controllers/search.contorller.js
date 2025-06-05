import { User } from "../models/user-model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (!response.results || response.results.length === 0) {
      return res.status(404).send(null);
    }

    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


export const searchMovie = async (req, res) => {
  const { query } = req.params;

  if (!req.user || !req.user._id) {
    return res.status(401).json({ success: false, message: "Unauthorized - user not found" });
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
    console.log("Calling TMDB with URL:", url);

    const response = await fetchFromTMDB(url);

    console.log("TMDB Response for movie search:", response);

    if (!response.results || response.results.length === 0) {
      return res.status(404).json({ success: false, message: "No movies found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date()
        }
      }
    });

    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const searchTv = async (req, res) => {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0){
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        })

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.log("Error in searchTv controller" ,error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}



export const getSearchHistory = async (req, res) => {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory }); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log("Error in getSearchHistory controller" ,error);
    }
}



export const deleteSearchHistory = async (req, res) => {
    let { id } = req.params;
    id = parseInt(id); // Convert the id to an integer
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }// Use the integer id for the query
            }
        });
        return res.status(200).json({ success: true, message: "Search history deleted successfully" });
    } catch (error) {
        console.log("Error in removing history" ,error);
        return res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

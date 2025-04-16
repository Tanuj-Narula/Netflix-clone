import React ,{useState, useEffect} from 'react'
import { easeInOut, hover, motion } from "framer-motion";
import { FaMagnifyingGlass, FaRegBell } from "react-icons/fa6";
import MovieDetails from './MoviesDetails';

import axios from 'axios';



function Search({setsearchOpen , searchOpen}) {
    const [movie, setMovie] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const url = `https://api.themoviedb.org/3/search/movie?query={${searchInput}}`;
    const headers= {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzYwZDVlNGVlMmMzMjZmNzJmM2NkOTEzMDFlYjc4MiIsIm5iZiI6MTc0MDExNjgwMy4zMTYsInN1YiI6IjY3YjgxMzQzNzQzNDIwMGMyODIyNWU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIkAZTBJEgdIRScdVsncRWzTkxSAeR87VYkMDH1Q58Y'
    }

    const handleChange = (e)=>{
        setSearchInput(e.target.value)
    }
    
    const toggleInfo = (id) => {
      setShowInfo(!showInfo);
    }
  
    
      async function fetchMovieDetails() {
        const response = await axios.get(url, {headers: headers});
        const data = response.data;
        setMovie(data);
      }
      
      console.log(movie)

  return (
    <div>
      <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: -10 }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex"
              >
                <span className={`${searchOpen ? "bg-[#181818] p-1": ""} rounded-tl-sm rounded-bl-sm border-t border-l border-b border-[#262626]`}><FaMagnifyingGlass className={`hover:cursor-pointer m-auto`} size={20} onClick={()=>setsearchOpen(!searchOpen)}/></span>
                <form action="" onSubmit={(e)=>{e.preventDefault(); fetchMovieDetails();} } className={`flex ${searchOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}>
                  <input type="text" value={searchInput} placeholder="Search for a movie or TV show" className="w-[20vw] h-[3vh] p-4 text-sm text-gray-300 rounded-tr-sm rounded-br-sm bg-[#181818] opacity-98 outline-none border border-[#262626]" autoFocus onBlur={()=> setsearchOpen(!searchOpen)} onChange={handleChange}/>
                  </form>
            </motion.div>

     {movie.results && movie.results.length > 0 && (  
       <MovieDetails movieID = {movie.results[0].id} onClose={() => toggleInfo()} type={'movie'} />)}
            
    </div>
  )
}

export default Search

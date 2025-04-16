import { useState, useEffect,useContext } from "react";
import { FaPlay } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import userContext from '../contexts/userContext';


const MovieDetails = ({ movieID, onClose }) => {
  const { user } = useContext(userContext);
const userId = user?._id;
  const [movie, setMovie] = useState([]);
  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`
  const headers= {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzYwZDVlNGVlMmMzMjZmNzJmM2NkOTEzMDFlYjc4MiIsIm5iZiI6MTc0MDExNjgwMy4zMTYsInN1YiI6IjY3YjgxMzQzNzQzNDIwMGMyODIyNWU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIkAZTBJEgdIRScdVsncRWzTkxSAeR87VYkMDH1Q58Y'
  }

  useEffect(()=>{
    async function fetchMovieDetails() {
      const response = await axios.get(url, {headers: headers});
      const data = response.data;
      setMovie(data);
    }
    fetchMovieDetails();
  },[movieID]);

   console.log(movie)
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = "auto";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.id === "overlay") {
      onClose();
    }
  };

  return (
    <div
      id="overlay"
      className="fixed inset-0 flex items-center justify-center bg-[#00000082] bg-opacity-80 text-white p-6 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col max-w-4xl h-full bg-neutral-950 p-6 rounded-lg shadow-lg overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
       {movie.length !== 0 && ( <>
         <button
         className="absolute top-7 right-7 text-white bg-[#121212c0] p-2 rounded-full hover:bg-neutral-950 cursor-pointer"
         onClick={onClose}
       >
         <IoClose className="h-5 w-5" />
       </button>
       <img
         src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
         alt={movie.title}
         className="h-[60%] rounded-lg"
       />
       <div className="absolute h-[56%] min-w-xs top-6 left-6 text-4xl font-bold mb-4 bg-gradient-to-r from-[#000000be]  via-[#0000007e] via-80% to-100% to-transparent p-5 flex flex-col justify-end rounded-b-lg">
         <h1 className="mb-0.5">{movie.title}</h1>
         <h4 className="text-lg text-gray-300 ml-1.5 mb-4">{movie.tagline}</h4>
       </div>
       
       <div className="w-full flex flex-col justify-between">
         <div className="flex space-x-6 mt-3">
           <button className="bg-neutral-200 text-black px-6 py-3 flex items-center rounded-lg font-semibold hover:bg-white cursor-pointer">
             <FaPlay className="h-6 w-6 mr-2" /> Play
           </button>
           <button
  className="bg-neutral-700 text-white px-6 py-3 flex items-center rounded-lg font-semibold hover:bg-neutral-600 cursor-pointer"
  onClick={async () => {
    try {
      await axios.post("http://localhost:5000/mylist/", {
        userId,
        movieId: movieID,
      });
      alert("Added to My List!");
    } catch (error) {
      console.error("Error saving movie to list:", error);
    }
  }}
>
  <CiBookmarkPlus className="h-6 w-6 mr-2" /> Add to My List
</button>
         </div>
         <div>
           <span className="text-white">{movie.release_date.slice(0,4)}  || </span>
           {movie.genres.map((genre)=>{
             return <span key={genre.id} className="text-white ml-3">{genre.name}</span>
           })}
           <p className="text-white">popularity: {movie.popularity}</p>
           <p className="text-white" >Runtime: {movie.runtime} min</p>
           <p className="text-lg text-white my-2 ">{movie.overview}</p>
         </div>
      
       </div>
       </>
       )}
      </div>
    </div>
  );
};

export default MovieDetails;

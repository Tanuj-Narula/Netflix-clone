import React  , {useEffect,useState, useContext} from 'react'
import MovieCard from '../components/Moviecard'
import { MovieContext } from "../contexts/moviesContext.jsx";


function Movies() {
  const {data , setData} = useContext(MovieContext)

  
  // console.log("data:" , data)
  

  return (
    <div  className='bg-[#121212] h-auto w-screen flex gap-6 flex-wrap items-center justify-center text-white p-8 pt-25'>
      {data.map((movie) =>{ 
        return <MovieCard key={movie.id} movie={movie} type={'movie'} />
      })}
    </div>
  )
}

export default Movies

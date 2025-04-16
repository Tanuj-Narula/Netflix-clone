import React , {useContext} from 'react'
import { TvContext } from '../contexts/TvContext'
import MovieCard from '../components/Moviecard'

function Tvshows() {
  const {data , data2} = useContext(TvContext)

  console.log("data:" , data);
  console.log("data2:" , data2);

  return (
    <div  className='bg-[#121212] h-auto w-screen flex gap-6 flex-wrap items-center justify-center text-white p-8 pt-25'>
    {data.map((Tv) =>{ 
      return <MovieCard key={Tv.id} movie={Tv} type = {'tv'} />
    })}
    {data2.map((Tv) =>{ 
      return <MovieCard key={Tv.id} movie={Tv} type= {'tv'} />
    })}
  </div>
  )
}

export default Tvshows

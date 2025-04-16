import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import userContext from '../contexts/userContext';

function Mylist() {
  const [myList, setMyList] = useState([]);
  const { user } = useContext(userContext);
  const userId = user?._id;

  const headers =  {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzYwZDVlNGVlMmMzMjZmNzJmM2NkOTEzMDFlYjc4MiIsIm5iZiI6MTc0MDExNjgwMy4zMTYsInN1YiI6IjY3YjgxMzQzNzQzNDIwMGMyODIyNWU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIkAZTBJEgdIRScdVsncRWzTkxSAeR87VYkMDH1Q58Y'
  }


  useEffect(() => {
    if (!userId) return;

    async function fetchMyList() {
      try {
        const response = await axios.get(`http://localhost:5000/mylist/${userId}`);
        const savedMovieIDs = response.data.map(item => item.movieId);

        const moviesData = await Promise.all(
          savedMovieIDs.map(id =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, { headers })
              .then(res => res.data)
          )
        );

        setMyList(moviesData);
      } catch (err) {
        console.error("Error fetching My List:", err);
      }
    }

    fetchMyList();
  }, [userId]);

  return (
    <div className='bg-[#121212] min-h-screen w-screen text-white p-8'>
      <h2 className='text-2xl font-bold mb-6'>My List</h2>
      {myList.length === 0 ? (
        <p>No movies saved.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {myList.map(movie => (
            <div key={movie.id} className="bg-neutral-800 rounded overflow-hidden shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mylist;

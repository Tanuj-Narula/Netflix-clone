import React, { createContext, useState , useEffect } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [Top_rated , set_Top_rated] = useState([]);
  const [Upcoming ,set_Upcoming] = useState([]);
  const [Now_playing , set_Now_playing] = useState([]);

  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get('http://localhost:3000/movies')
      
        setData(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData();
  }, [])

  useEffect(()=>{
    async function fetchTopRated(){
      try{
        const response = await axios.get('http://localhost:3000/movies/top_rated')
      
        set_Top_rated(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchTopRated();
  }, [])


  useEffect(()=>{
    async function fetchUpcoming(){
      try{
        const response = await axios.get('http://localhost:3000/movies/upcoming')
      
        set_Upcoming(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchUpcoming();
  }, [])

  useEffect(()=>{
    async function fetchNowPlaying(){
      try{
        const response = await axios.get('http://localhost:3000/movies/Now_playing')
      
        set_Now_playing(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchNowPlaying();
  }, [])


  return (
    <MovieContext.Provider value={{ data, setData , Top_rated , set_Top_rated ,Upcoming , set_Upcoming ,Now_playing, set_Now_playing }}>
      {children}
    </MovieContext.Provider>
  );
};
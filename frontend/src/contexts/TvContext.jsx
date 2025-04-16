import React, { createContext, useState , useEffect } from "react";
import axios from "axios";

export const TvContext = createContext();

export const TvProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  

  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get('http://localhost:3000/tv/get1')
        console.log(response.data.results)
        setData(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData();
  }, [])

  useEffect(()=>{
    async function fetchData2(){
      try{
        const response = await axios.get('http://localhost:3000/tv/get2')
        console.log(response.data.results)
        setData2(response.data.results);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchData2();
  }, [])

  return (
    <TvContext.Provider value={{ data, setData , data2, setData2 }}>
      {children}
    </TvContext.Provider>
  );
};
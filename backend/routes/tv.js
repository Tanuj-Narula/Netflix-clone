import { Router } from "express";
import db from "../db.js";
import axios from "axios";

const tv = Router();



const headers= {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzYwZDVlNGVlMmMzMjZmNzJmM2NkOTEzMDFlYjc4MiIsIm5iZiI6MTc0MDExNjgwMy4zMTYsInN1YiI6IjY3YjgxMzQzNzQzNDIwMGMyODIyNWU1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIkAZTBJEgdIRScdVsncRWzTkxSAeR87VYkMDH1Q58Y'
}

const url= 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'

async function fetchAPI(){
    const response = await axios.get(url, {headers: headers});
    const data = response.data;
    return data;
}

const url2= 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=2'

async function fetchAPI2(){
    const response = await axios.get(url2, {headers: headers});
    const data = response.data;
    return data;
}

tv.get("/get1", async (req, res) => {
    try {
        const data = await fetchAPI()
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" , error: error});
    }
});

tv.get("/get2", async (req, res) => {
    try {
        const data = await fetchAPI2()
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" , error: error});
    }
});


export default tv;
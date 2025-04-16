import express, { json } from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";
import auth from './routes/auth.js';
import movies  from "./routes/movies.js";
import router from "./routes/mylist.js";

  
dotenv.config();

const app = express();
const PORT =  3000;

app.use(json()); 
app.use(cors());
app.use("/auth", auth);
app.use("/movies", movies);
app.use("/mylist", router); 


db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});


app.get("/", (req, res) => {
    res.send("Netflix Clone Backend is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import MovieReviews from "./MovieReviews";
import MovieForm from "./MovieForm";
import MovieReview from "./MovieReview";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App(){
 const [movies, setMovies] = useState([]);

 useEffect(() => {
   async function fetchMovies() {
     const response = await axios.get("/api/movie");
     setMovies(response.data);
   }
   fetchMovies();
 }, []);

 const handleAddMovie = async (newMovie) =>{
   try {
     const response = await axios.post("/api/movie", newMovie);
     setMovies([...movies, response.data]);
   } catch (error) {
     console.error("Error adding movie:", error);
   }
 };

 const handleRemoveMovie = async (movieId) =>{
   try {
     await axios.delete("/api/movie", { data: { id: movieId } });
     setMovies(movies.filter(movie => movie._id !== movieId));
   } catch (error) {
     console.error("Error removing movie:", error);
   }
 };

 return(
  <Router>
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<MovieReviews movies={movies} onRemove={handleRemoveMovie} />} />
        <Route path="/form" element={<MovieForm onAdd={handleAddMovie} />} />
        <Route path="/movie/:id" element={<MovieReview movies={movies} />} />
      </Routes>
    </div>
  </Router>
);
}

export default App;
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import client from './mongo.js';
import cors from 'cors';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.get(/^(?!\/api).+/, (req, res) => {
   res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.get('/api/movie', async (req, res) => {
   const database = client.db("movieDB");
   const movies = database.collection("movies");

   const movieData = await movies.find().toArray();
   res.json(movieData);
})

app.post('/api/movie', async (req, res) => {
   const name = req.body.name;
   const rating = req.body.rating;
   const releaseDate =  req.body.releaseDate;
   const description = req.body.description;
   const actors = req.body.actors.split(",");
   const poster = req.body.poster;

   if (!name || !rating || !releaseDate || !description || !actors || !poster) {
       return res.status(400);
   }
   else{

   const database = client.db("movieDB");
   const movies = database.collection("movies");

   const result = await movies.insertOne({ name: name, rating: rating, releaseDate: releaseDate, description: description, actors: actors, poster: poster});
   return res.json({name: name, rating: rating, releaseDate: releaseDate, description: description, actors: actors, poster: poster, _id: result.insertedId});
   }

})

app.delete('/api/movie', async (req, res) => {
   const id = req.params.id;

   const database = client.db("movieDB");
   const movies = database.collection("movies");

   const deleteResult = await movies.deleteOne({ _id: id });
   res.json({ deletedMovies: deleteResult.deletedCount });
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
})
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import client from './mongo.js';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

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
   const { name, rating, releaseDate, description, actors, poster } = req.body;

   if (!name || !rating || !releaseDate || !description || !actors || !poster) {
       return res.status(400).json({ error: "Missing movie information." });
   }

   const database = client.db("movieDB");
   const movies = database.collection("movies");

   const result = await movies.insertOne({ name, rating, releaseDate, description, actors, poster });
   res.json(result.ops[0]);
})

app.delete('/api/movie', async (req, res) => {
   const id = req.body.id;

   const database = client.db("movieDB");
   const movies = database.collection("movies");

   const deleteResult = await movies.deleteOne({ _id: client.ObjectID(id) });
   res.json({ deletedMovies: deleteResult.deletedCount });
})

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
})

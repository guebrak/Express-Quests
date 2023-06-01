require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json()); 

const port = process.env.APP_PORT ?? 5000;


const { validateUser, validateMovie } = require("./validator"); // ajoute la validation des donné (tout les champs sont prrésent)

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

// from movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


//from user
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

require("dotenv").config();
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

const express = require("express");
// const Joi = require('joi');

// Pour que express lise les fichier JSON
app.use(express.json());

// Le ?? 5000 fourni une valeur par défaut si process.env.APP_PORT n'est pas défini
const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};


const isItDwight = (req,res) => {
  if(req.body.email === "dwight@theoffice.com" && req.body.password === "123456"){
    res.send("credential are valid")
  }else{
    res.sendStatus(401);
  }
}

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const users = require("./users");
const { validateMovie, validateUser } = require("./validators");
const { hashPassword } = require("./auth");


//app.get sert à regarder se qu'il y as
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", users.getUsers);
app.get("/api/users/:id", users.getUsersById);

//app.post sert à poster de nouvelles infos 
app.post("/api/movies", movieHandlers.postMovie);
app.post("api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, hashPassword, users.postUsers);
app.post("/api/users", validateUser, usersHandlers.postUser);
//login
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword
);


//app.put sert à Update de nouvelles infos
app.put("/api/movies/:id",validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, usersHandlers.updateUsers );
app.put("/api/users/:id", validateUser, hashPassword, users.updateUsers);

//app.delete permet de supprimer une information
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", users.deleteUser);
app.delete("/api/users/:id", usersHandlers.deleteUsers);

//private routes

app.use(verifyToken);

//Sert à écouter les routes
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
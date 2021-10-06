const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

let path = require('path');
const app = express();
app.listen(8080);
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/actor', function (err) {
  if (err) {
    return console.log('Mongoose - connection error:', err);
  }
  console.log('Connect Successfully');
});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);


app.delete('/actors/:actorId/:movieId', actors.removeMovie);
app.delete('/delactors/:id', actors.deleteactorandmovies);
//extra
app.put('/actorsinc',actors.newAge)
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieId/:actorId', movies.removeActor); 
app.put('/movies/:movieId/:actorId', movies.addActor);
app.get('/movies/:year1/:year2', movies.getfromYear);  
app.delete('/delmovies', movies.deleteYear);

//week 9 required paths
app.delete('/actors/:id', actors.deleteOne);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.post('/movies/:id/actors', movies.addActors);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:title', movies.deleteByTitle);
app.delete('/movies/delDuration/:year1/:year2', movies.deleteByRange)

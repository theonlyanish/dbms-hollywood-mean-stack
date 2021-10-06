const mongoose = require('mongoose');
const actor = require('../models/actor');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
//7
    getAll: function (req, res) {
        Actor.find()
            .populate('movies')
            .exec(function(err, actor) {
                if (err) {
                    return res.status(404).json(err); 
                } else {
                    res.json(actor);
                }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                });
            })
        });
    },
//3
    removeMovie : function (req, res){
        
        Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.pull(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteActMovies : function(req, res){

        Actor.findById(req.params.id ,function (err, data){
            if (err) return res.status(400).json(err);
            Movie.deleteMany({_id: Movie }, function (err){
                if (err) res.json(err)
                else
                
                Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json()
                }); 
            })
        })
    },
//2
    deleteactorandmovies: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            for(let i = 0; i < actor.movies.length ; i++){
                Movie.findOneAndRemove({ _id: actor.movies[i] }, function (err) {
                    if (err) return res.status(400).json(err);
                    res.json();
                });
            }
        });
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
//extra
    newAge: function(req, res){
        Actor.findOneAndUpdate({if: Actor.name[0] = "M"}, {$inc : {bYear: 10}} ,function(err) {
            if (err) return res.status(400).json(err);
            res.json();
        })
    }

};
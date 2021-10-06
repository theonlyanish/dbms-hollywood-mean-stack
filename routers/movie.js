var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
//8
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteByTitle: function (req, res) {
        Movie.findOneAndRemove({title:req.params.title}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteByRange: function (req,res){
        query = {year: { $gte: req.params.year1 } ,  year: { $lte: req.params.year2 }}
        Movie.deleteMany(query).exec();
        res.json();
      },

//1. 
    deleteOne: function(req, res){
        Movie.findOneAndDelete({_id: req.params.id }, function(err){
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
//4
    removeActor : function (req, res){
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.pull(actor._id);

                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
//5
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({ _id: req.params.actorId }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);

                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
//6
    getfromYear: function (req,res){
        Movie.where("year")
        .lte(req.params.year1)
        .gte(req.params.year2)
        .exec(function (err,movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
//9
    deleteYear: function (req,res){
        Movie.deleteMany({year:{ $gte:req.body.year2},year:{ $lte: req.body.year1}})
        .exec();
        res.json();
    },

    addActors: function(req, res){
        Movie.findOne({ title : req.params.movieTitle }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ name : req.body.name }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
};

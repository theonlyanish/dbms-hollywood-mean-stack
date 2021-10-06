import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addactortomovie',
  templateUrl: './addactortomovie.component.html',
  styleUrls: ['./addactortomovie.component.css']
})
export class AddactortomovieComponent implements OnInit {

  actorsDB: any[] = [];
  moviesDB: any[] = [];
  title: string = "";
  fullName: string = "";
  bYear: number = 0;
  movieId: string = '';
  year:number=0
  actorId: string='';




  constructor(private dbService: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  onGetActors() {
    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  } 

  onAddActors() {
    this.dbService.addActorToMovie(this.actorId, this.movieId).subscribe((result) => {
      this.onGetMovies();
      this.onGetActors();
      this.router.navigate(["/listmovies"]);
    });
  }

}
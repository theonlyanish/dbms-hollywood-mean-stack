import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-deletemovie",
  templateUrl: "./deletemovie.component.html",
  styleUrls: ["./deletemovie.component.css"],
})

export class DeletemovieComponent implements OnInit {
  constructor(private dbService: DatabaseService, private router: Router) {}
 
  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;

  //Get all Actors
  onGetMovies() {
    console.log("From on GetMovies");

    return this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });
  }
  //Delete Actor
  onDeleteMovie(item: any) {
    this.dbService.deleteByTitle(item._id).subscribe(result => {
      this.onGetMovies();
      this.router.navigate(["/listmovies"]);
    });
  }
  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetMovies();
  }
}
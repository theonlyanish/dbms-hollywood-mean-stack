import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result:any
  
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data:object) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id:string, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id:string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

    // for Movie
  getMovies() {
    return this.http.get("/movies");
  }
  getMovie(id: string) {
    let url = "/movies/" + id;
    return this.http.get(url);
  }

  createMovie(data:object) {
    return this.http.post("/movies", data, httpOptions);
  }

  deleteByTitle(title: string) {
    let url = '/movies/' + title;
    return this.http.delete(url, httpOptions);
  }

  deleteByRange(from: number, to: number){
    let url = "/movies/delrange/"+from+"/"+to;
    return this.http.delete(url,httpOptions);
  }
  addActorToMovie(actorId:string,movieId:string){
    let url = '/movies/'+actorId+'/'+movieId;
    return this.http.post(url, httpOptions);
  }


  }
  
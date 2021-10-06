import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DatabaseService } from "./database.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ListactorsComponent } from "./listactors/listactors.component";
import { AddactorComponent } from "./addactor/addactor.component";
import { DeleteactorComponent } from "./deleteactor/deleteactor.component";
import { UpdateactorComponent } from "../app/updateactor/updateactor.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule, Routes } from "@angular/router";
import { environment } from '../environments/environment';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { DeletemovieComponent } from './deletemovie/deletemovie.component';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { AddactortomovieComponent } from './addactortomovie/addactortomovie.component';
import { ViewnotfoundComponent } from './viewnotfound/viewnotfound.component';
import { newAge } from './w10strsub.pipe';




const appRoutes: Routes = [
  { path: "listactors", component: ListactorsComponent },
  { path: "addactor", component: AddactorComponent },
  { path: "addmovie", component: AddmovieComponent },
  { path: "updateactor", component: UpdateactorComponent },
  { path: "deleteactor", component: DeleteactorComponent },
  { path: "deletemovie", component: DeletemovieComponent },
  { path: "listmovies", component: ListmoviesComponent },
  { path: "addactortomovie", component: AddactortomovieComponent },
  { path: "**", component: ViewnotfoundComponent },
  { path: "", redirectTo: "/listactors", pathMatch: "full" },
];
@NgModule({
  declarations: [
    AppComponent,
    ListactorsComponent,
    AddactorComponent,
    UpdateactorComponent,
    DeleteactorComponent,
    UpdateactorComponent,
    AddmovieComponent,
    DeletemovieComponent,
    ListmoviesComponent,
    AddactortomovieComponent,
    ViewnotfoundComponent,
    newAge
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
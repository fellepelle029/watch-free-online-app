import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilmRequestType} from "../../../types/film-request-type";
import {environment} from "../../../environments/environment";
import {MovieResponseType} from "../../../types/movie-resonse-type";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  constructor(private http: HttpClient) { }

  searchFilmByKeyword(keyword: string): Observable<FilmRequestType> {
    const headers: HttpHeaders = new HttpHeaders({
      'X-API-KEY':`${environment.kinopoiskApiKey}`,
      'Content-Type':'Content-Type'
    });

    return this.http.get<FilmRequestType>(
      `${environment.kinopoiskApi}v2.1/films/search-by-keyword?keyword=${keyword}`, {headers});
  }

  loadMovieById(movieId: string): Observable<MovieResponseType> {
    return this.http.get<MovieResponseType>(
      `https://xn--80aacocwmecldecbkmhpmjcm1t.xn--p1ai/api/film-proxy.php?kinopoisk=${movieId}`
    );
  }

}

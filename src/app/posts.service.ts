import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  API_KEY = 'api_key=94f1a35a42d82dddf6ec7d47d2e7d4cf';
  BASE = 'https://api.themoviedb.org/3';
  movieId = '/movie';
  currentPage: any;
  prevPage: any;
  nextPage: any;
  totalPages: any;
  API_URL1: any;
  API_URL =
    this.BASE + '/discover/movie?sort_by=popularity.desc&' + this.API_KEY;

  //genre_URL = this.API_URL + '&with_genres';
  Search_URL: any;
  constructor(private http: HttpClient) {}
  getPosts() {
    return this.http.get(this.API_URL);
  }
  getPostsByGenere(url: any) {
    return this.http.get(url);
  }
  getCurrentDate(title: any) {
    return this.http.get(this.API_URL);
  }
  getSingleMovieData(id: any) {
    this.API_URL1 = this.BASE + this.movieId + '/' + id + '?' + this.API_KEY;
    return this.http.get(this.API_URL1);
  }
  getSearchMovie(searchTerm: any) {
    this.Search_URL =
      this.BASE + '/search/movie?' + this.API_KEY + '&query=' + searchTerm;
    return this.http.get(this.Search_URL);
  }
}

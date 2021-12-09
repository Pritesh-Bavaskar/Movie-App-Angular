import { PostsService } from './../../posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentPage = 1;
  genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  selectedGenre: any;
  id: any;
  genre_URL: any;
  colorHighlight = {};
  bgcolor = true;
  nobgcolor = true;
  highValue: any;
  prevAct = 0;
  nextAct = 0;
  prevPage: any;
  nextPage: any;
  totalPages: any;
  nextAPI: any;
  prevAPI: any;
  genreSelected = 0;

  API_URL =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=94f1a35a42d82dddf6ec7d47d2e7d4cf';
  // highlightedTag:any;
  constructor(private postData: PostsService) {}
  data: any;
  IMG_URL = 'https://image.tmdb.org/t/p/w500';
  ngOnInit(): void {
    this.postData.getPosts().subscribe((results: any) => {
      console.log('result-here', results);
      this.data = results.results;
      this.currentPage = 1;
    });
  }
  searchResult(response: any) {
    console.log('response from home', response);
    this.data = response.results;
    this.genreSelected = 0;
  }
  resetMoviesDefault(data: any) {
    this.postData.getPosts().subscribe((results: any) => {
      console.log('result-here', results);
      this.data = results.results;
      this.currentPage = 1;
      this.genreSelected = 0;
    });
  }
  tagsClicked(id: any) {
    this.currentPage = 1;
    this.highValue = id;
    this.selectedGenre = this.genres.find((x) => x.id === id);
    console.log('Selected Genre = ', this.selectedGenre.name);
    this.genre_URL =
      this.API_URL + '&with_genres=' + this.selectedGenre.id + ',';
    this.postData.getPostsByGenere(this.genre_URL).subscribe((res: any) => {
      this.data = res.results;
      this.genreSelected = 1;
    });

    console.log('highlight selected', this.selectedGenre);
    //this.selectedGenre.id.
    if (this.highValue == id) {
      this.colorHighlight = {
        bgcolor: this.bgcolor,
      };
      console.log('tag highlighed', this.highValue);
    }
  }
  resetOnButton(value: any): void {
    this.highValue = value;
    if (this.highValue != value) {
      this.colorHighlight = {
        bgcolor: this.bgcolor,
      };
    }
  }
  noSelectionButton(value: any): void {
    this.currentPage = 1;
    console.log('no selection');
    this.postData.getPosts().subscribe((results: any) => {
      console.log('result-here', results);
      this.data = results.results;
      this.highValue = value;
      if (this.highValue != value) {
        this.colorHighlight = {
          bgcolor: this.bgcolor,
          genreSelected: 0,
        };
      }
    });
  }

  next() {
    if (this.currentPage == 500) {
      alert('Can Not Go Next');
      this.nextAct = 1;
      console.log(this.nextAct);
    } else if (this.genreSelected == 1) {
      this.postData.getPosts().subscribe((results: any) => {
        this.nextAPI = this.genre_URL + '&page=' + (this.currentPage + 1);
        this.postData.getPostsByGenere(this.nextAPI).subscribe((res: any) => {
          this.data = res.results;
          this.currentPage = this.currentPage + 1;
          this.prevAct = 0;
          window.scroll(0, 0);
          console.log('2nd loop');
        });
      });
    } else {
      this.postData.getPosts().subscribe((results: any) => {
        this.nextAPI = this.API_URL + '&page=' + (this.currentPage + 1);
        this.postData.getPostsByGenere(this.nextAPI).subscribe((res: any) => {
          this.data = res.results;
          this.currentPage = this.currentPage + 1;
          this.prevAct = 0;
          window.scroll(0, 0);
        });
      });
    }
  }
  prev() {
    if (this.currentPage == 1) {
      this.prevAct = 1;

      alert('Can Not Go Previous');
      console.log(this.prevAct);
    } else {
      this.postData.getPosts().subscribe((results: any) => {
        this.prevAPI = this.API_URL + '&page=' + (this.currentPage - 1);
        this.postData.getPostsByGenere(this.prevAPI).subscribe((res: any) => {
          this.data = res.results;
          this.currentPage = this.currentPage - 1;
          this.nextAct = 0;
          window.scroll(0, 0);
        });
      });
    }
  }
}

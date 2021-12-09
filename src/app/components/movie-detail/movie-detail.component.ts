import { AppComponent } from './../../app.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  constructor(private router: ActivatedRoute, private postData: PostsService) {}

  id: any;
  movieDetails: any;
  movieDetailsExportArray: any = [];

  IMG_URL = 'https://image.tmdb.org/t/p/w500';
  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    console.log(this.id);

    this.postData.getSingleMovieData(this.id).subscribe((res) => {
      this.movieDetails = res;
      this.movieDetailsExportArray.push(res);
    });
  }

  downloadCsv() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Movie Details',
      useBom: true,
      //noDownload: true,
      //headers: ['Title', '', 'ID'],
    };

    new ngxCsv(this.movieDetailsExportArray, 'Movie-Details', options);
    console.log(this.movieDetails);
  }
}

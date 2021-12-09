import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { FormBuilder, Validators } from '@angular/forms';

const form = document.createElement('form');
let search = document.createElement('input');

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output('search') search = new EventEmitter<any>();
  @Output('moviesDefault') moviesDefault = new EventEmitter<any>();
  @Output('noSelect') noSelect = new EventEmitter<any>();
  constructor(
    private router: ActivatedRoute,
    private postData: PostsService,
    private fb: FormBuilder
  ) {}

  search_form = this.fb.group({
    search: ['', Validators.required],
  });

  id: any;
  movieDetails: any;
  movieDetailsExportArray: any = [];
  data: any;
  highValue: any;

  ngOnInit(): void {}

  onSearch() {
    //console.log(this.search_form.value);
    var searchValue = this.search_form.controls['search'].value;
    console.log('search value: ' + searchValue);
    this.postData.getSearchMovie(searchValue).subscribe((result) => {
      console.log('search results', result);
      this.search.emit(result);
    });
  }

  reset() {
    this.postData.getPosts().subscribe((results: any) => {
      console.log('result-here', results);
      this.data = results.results;
      this.moviesDefault.emit(this.data);
    });
  }
  noSelection() {
    this.postData.getPosts().subscribe((results: any) => {
      //console.log('result-here', results);
      this.highValue = '';
      this.noSelect.emit(this.highValue);
    });
  }
}

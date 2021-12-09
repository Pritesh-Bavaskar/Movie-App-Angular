import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostsService } from 'src/app/posts.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Output('pagePrev') pagePrev = new EventEmitter<any>();
  @Output('pageNext') pageNext = new EventEmitter<any>();
  constructor(private postData: PostsService) {}

  data: any;

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from './../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.css']
})
export class BookmarkTileComponent implements OnInit {
  faviconError: boolean;
  @Input() bookmark: Bookmark;
  tilIconSrc: string;
  constructor() { }

  ngOnInit(): void {
    this.tilIconSrc = this.bookmark.url.origin + '/favicon.ico';
  }

}

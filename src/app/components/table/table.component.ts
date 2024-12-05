import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/Article.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() articles: Array<Article> = new Array<Article>();

  constructor() { }

  ngOnInit(): void {
  }

}

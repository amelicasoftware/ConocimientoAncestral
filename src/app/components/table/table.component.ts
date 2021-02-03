import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { FiledSort } from '../../models/filedSort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() articles: Array<Article> = new Array<Article>();

  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';
  reverseR = true;
  reverseN = true;

  constructor( private articleService: ArticleService ) { }

  ngOnInit(): void {
  }

  reverse(field: string, reverse: boolean){
    const fieldSort: FiledSort = new FiledSort();
    fieldSort.field = field;
    fieldSort.reverse = reverse;
    this.articleService.changeFiledSort(fieldSort);
    this.changeIcon(field, reverse);
  }

  changeIcon(field: string, reverse: boolean){
    if (reverse && field === 'nombreRevista'){
      this.imagenR = 'assets/img/as.png';
      this.reverseR = false;
    } else {
      this.imagenR = 'assets/img/des.png';
      this.reverseR = true;
    }

    if (reverse && field === 'anio'){
      this.imagenN = 'assets/img/as.png';
      this.reverseN = false;
    } else {
      this.imagenN = 'assets/img/des.png';
      this.reverseN = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
// import { url } from 'inspector';
import { Article } from 'src/app/models/Article.model';
import { ArticleResult } from 'src/app/models/ArticleResult.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.css']
})
export class LastArticlesComponent implements OnInit {

  articles: Array<Article> = new Array<Article>();
  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.articleService.getLastArticles().subscribe((articles: any) => {
      console.log(articles.resultados);
      this.articles = articles.resultados;
      // console.log(articlesArray);
      // console.log(this.articlesArray);
    });
  }

  parserDataArticle(dataArticle: string) {
    const data = dataArticle.split('::');
    return data[1];
  }
}

import { Article } from './Article.model';
import { Filter } from './Filter.model';
export interface ArticleResult {
    filtros: Array<Filter>;
    resultados: Array<Article>;
    totalResultados: number;
}

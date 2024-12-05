import { EventEmitter, Injectable, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  @Output()lang = new EventEmitter<string>();

  constructor(
    private translate: TranslateService
  ) { }

  public changeLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this.lang.emit(lang);
  }
}

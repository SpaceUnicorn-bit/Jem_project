import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  /* transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }*/
  transform(v: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustResourceUrl(v);
  }
}

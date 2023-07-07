import {inject, Pipe, PipeTransform} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Pipe({
  name: 'fetchImage',
  standalone: true,
})
export class FetchImagePipe implements PipeTransform {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);

  transform(url: string): Observable<SafeUrl> {
    const proxyUrl = `${environment.api}fetch_image?url=` + encodeURIComponent(url);

    return this._http.get(proxyUrl, { responseType: 'blob' }).pipe(
      map((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        return this._sanitizer.bypassSecurityTrustUrl(objectUrl);
      })
    )
  }

}

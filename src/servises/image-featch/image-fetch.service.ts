import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map, Observable } from "rxjs";

@Injectable()
export class ImageFetchService {
  constructor(private httpService: HttpService) {}

  public fetchImage(url: string): Observable<Buffer> {
    return this.httpService
      .get(url, { responseType: "arraybuffer" })
      .pipe(map(({ data }) => data));
  }
}

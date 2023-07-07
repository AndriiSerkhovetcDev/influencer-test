import { Controller, Get, Query, Res } from "@nestjs/common";
import { ImageFetchService } from "../../servises/image-featch/image-fetch.service";
import { take } from "rxjs";
import { Response } from "express";

@Controller("fetch_image")
export class ImageFetchController {
  constructor(private readonly imageFetchService: ImageFetchService) {}

  @Get()
  fetchImage(@Query("url") imageUrl: string, @Res() res: Response) {
    this.imageFetchService
      .fetchImage(imageUrl)
      .pipe(take(1))
      .subscribe((data) => {
        res.send(data);
      });
  }
}

import { Test, TestingModule } from "@nestjs/testing";
import { ImageFetchService } from "./image-fetch.service";

describe("ImageFeatchService", () => {
  let service: ImageFetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageFetchService],
    }).compile();

    service = module.get<ImageFetchService>(ImageFetchService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { ImageFetchController } from "./image-fetch.controller";

describe("ImageFetchController", () => {
  let controller: ImageFetchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageFetchController],
    }).compile();

    controller = module.get<ImageFetchController>(ImageFetchController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

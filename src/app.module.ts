import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./controllers/users/users.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { UsersService } from "./servises/users/users.service";
import { ImageFetchController } from "./controllers/image-fetch/image-fetch.controller";
import { ImageFetchService } from "./servises/image-featch/image-fetch.service";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController, UsersController, ImageFetchController],
  providers: [AppService, UsersService, ImageFetchService],
})
export class AppModule {}

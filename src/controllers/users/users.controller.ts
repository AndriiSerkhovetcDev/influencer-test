import { Controller, Get, Param, Query } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../../servises/users/users.service";
import { TSearchedUser } from "../../types/search-user.type";
import { TUserDetails } from "../../types/user-details.type";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  searchUsers(@Query("q") query: string): Observable<TSearchedUser[]> {
    return this.usersService.searchUsers(query);
  }

  @Get(":username")
  getUser(@Param("username") username: string): Observable<TUserDetails> {
    return this.usersService.getUserAndUserFeeds(username);
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../servises/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    searchUsers(@Query('q') query: string,): Observable<any> {
        return this.usersService.searchUsers(query);
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUserAndUserFeeds(id);
    }
}

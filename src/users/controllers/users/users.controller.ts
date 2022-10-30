/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { get } from 'http';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { CreateUserPostDTO } from 'src/users/dto/CreateUserPost.dto';
import { CreateUserProfileDTO } from 'src/users/dto/CreateUserProfile.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Get()
    async getUsers() {
        const users = await this.userService.findUsers()
        return users
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDTO) {
        return this.userService.createUser(createUserDto)
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUser: UpdateUserDTO
    ) {
        await this.userService.updateUser(id, updateUser)
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe) id: number
    ) {
        await this.userService.deleteUser(id)
    }

    @Post(':id/profiles')
    async createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDTO: CreateUserProfileDTO) {

        return this.userService.createUserProfile(id, createUserProfileDTO)

    }

    @Post(':id/post')
    async createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDTO: CreateUserPostDTO) {

        console.log(createUserPostDTO, "check it")
        return this.userService.createUserPost(id, createUserPostDTO)

    }


}

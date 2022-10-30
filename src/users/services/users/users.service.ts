/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dto/UpdateUser.dto';
import { CreateUserProfileDTO } from 'src/users/dto/CreateUserProfile.dto';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';
import { CreateUserPostDTO } from 'src/users/dto/CreateUserPost.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>

    ) { }

    findUsers() {
        return this.userRepository.find()
    }

    createUser(createUser: CreateUserDTO) {
        const newUser = this.userRepository.create({ ...createUser })
        return this.userRepository.save(newUser)
    }

    updateUser(id: number, updateUser: UpdateUserDTO) {
        return this.userRepository.update(id, { ...updateUser })
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id)
    }

    async createUserProfile(id: number, createUserProfileDTO: CreateUserProfileDTO) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST)

        const newProfile = this.profileRepository.create(createUserProfileDTO)

        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile

        return this.userRepository.save(user)
    }

    async createUserPost(id: number, createUserPostDTO: CreateUserPostDTO) {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST)
        const newPost = this.postRepository.create({ ...createUserPostDTO, user })

        return this.postRepository.save(newPost)

    }
}

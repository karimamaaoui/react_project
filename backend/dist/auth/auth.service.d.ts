import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Post } from 'src/posts/entities/post.entity';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Response } from 'express';
export declare class AuthService {
    private userModel;
    private postModel;
    private jwtService;
    private configService;
    constructor(userModel: Model<User>, postModel: Model<Post>, jwtService: JwtService, configService: ConfigService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<{
        token: string;
    }>;
    validateGoogleUser(googleUser: SignUpDto): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: Types.ObjectId;
    } & {
        __v?: number;
    }>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<User>;
    addPostToUser(userId: string, createPostDto: CreatePostDto): Promise<Post>;
    updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
}

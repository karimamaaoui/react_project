import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Post } from 'src/posts/entities/post.entity';  
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,  
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { email, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      role,
    });
    const token = this.jwtService.sign(
      { id: user._id },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
    
    return { token };
  }

  async login(loginDto: LoginDto ,res: Response): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email is incorrect');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const token = this.jwtService.sign(
      { id: user._id,
        role: user.role ,
        email:user.email
       },
      { secret: this.configService.get<string>('JWT_SECRET') },
    );

    res.cookie('jwt', token, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 3 * 24 * 60 * 60 * 1000, // Cookie expiration time (3 days)
    });

    
    return { token };
  }

  async validateGoogleUser(googleUser: SignUpDto) {
    const user = await this.userModel.findOne({ email: googleUser.email });
    if (user) return user;
    return await this.userModel.create(googleUser);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async addPostToUser(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const userObjectId = Types.ObjectId.isValid(userId)
      ? new Types.ObjectId(userId)
      : userId;

    const user = await this.userModel.findById(userObjectId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = new this.postModel({
      ...createPostDto,
      author: userObjectId,
    });

    await newPost.save();

    user.posts.push(newPost._id as Types.ObjectId);

    await user.save();

    return newPost;
  }
  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (updateUserDto.firstname) user.firstname = updateUserDto.firstname;
    if (updateUserDto.lastname) user.lastname = updateUserDto.lastname;
    if (updateUserDto.profilePicture) user.profilePicture = updateUserDto.profilePicture;
    if (updateUserDto.bio) user.bio = updateUserDto.bio;
    if (updateUserDto.skills) user.skills = updateUserDto.skills;
    if (updateUserDto.projects) user.projects = updateUserDto.projects;
  
    await user.save();
    return user;
  }
  


}

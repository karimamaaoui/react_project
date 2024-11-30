import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity'; 
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import * as fs from 'fs';
import * as csv from 'csv-parser';


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  async getAllPosts(sortBy: string = 'createdAt', order: 'desc' = 'desc'): Promise<Post[]> {
    const sortField = sortBy || 'createdAt';
    const sortOrder = order === 'desc' ? -1 : 1;
  
    return this.postModel.find().sort({ [sortField]: sortOrder }).exec();
  }
  

  async getPostsByUserId(author: string,sortBy: string = 'createdAt', order: 'desc' = 'desc'): Promise<Post[]> {
    const sortField = sortBy || 'createdAt';
    const sortOrder = order === 'desc' ? -1 : 1;
 
    return await this.postModel
      .find({ author })
      .sort({ [sortField]: sortOrder })
      .exec();
  }
  
 

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return updatedPost;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return { message: 'Post deleted successfully' };
  }
}

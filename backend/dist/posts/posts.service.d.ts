import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    getAllPosts(sortBy?: string, order?: 'desc'): Promise<Post[]>;
    getPostsByUserId(author: string, sortBy?: string, order?: 'desc'): Promise<Post[]>;
    findOne(id: string): Promise<Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

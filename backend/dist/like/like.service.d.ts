import { CreateLikeDto } from './dto/create-like.dto';
import { Model } from 'mongoose';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
export declare class LikeService {
    private likeModel;
    private postModel;
    constructor(likeModel: Model<Like>, postModel: Model<Post>);
    createLike(createLikeDto: CreateLikeDto): Promise<Like>;
    deleteLike(likeId: string): Promise<void>;
    getLikesByPost(postId: string): Promise<Like[]>;
}

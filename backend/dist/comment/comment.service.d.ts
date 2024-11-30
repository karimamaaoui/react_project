import { CreateCommentDto } from './dto/create-comment.dto';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<Comment>);
    addComment(createCommentDto: CreateCommentDto): Promise<Comment>;
    getCommentsByPost(postId: string): Promise<Comment[]>;
    deleteComment(commentId: string): Promise<void>;
}

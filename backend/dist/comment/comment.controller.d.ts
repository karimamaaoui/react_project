import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    addComment(req: any, postId: string, createCommentDto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    getComments(postId: string): Promise<import("./entities/comment.entity").Comment[]>;
    deleteComment(commentId: string): Promise<void>;
}

import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    create(req: any, postId: string, createLikeDto: CreateLikeDto): Promise<import("./entities/like.entity").Like>;
    getLikes(postId: string): Promise<import("./entities/like.entity").Like[]>;
    remove(id: string): Promise<void>;
}

import { Types } from 'mongoose';
export declare class CreatePostDto {
    author: Types.ObjectId;
    title: string;
    content: string;
    image?: string;
}

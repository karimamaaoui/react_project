import { Document, Types } from "mongoose";
export declare class Post extends Document {
    author: Types.ObjectId;
    title: string;
    content: string;
    image?: string;
    likes: number;
    comments: string[];
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, Document<unknown, any, Post> & Post & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;

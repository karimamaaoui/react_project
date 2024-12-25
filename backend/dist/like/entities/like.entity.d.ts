import { Document, Types } from "mongoose";
export declare class Like extends Document {
    postId: Types.ObjectId;
    author: Types.ObjectId;
}
export declare const LikeSchema: import("mongoose").Schema<Like, import("mongoose").Model<Like, any, any, any, Document<unknown, any, Like> & Like & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Like, Document<unknown, {}, import("mongoose").FlatRecord<Like>> & import("mongoose").FlatRecord<Like> & Required<{
    _id: unknown;
}> & {
    __v?: number;
}>;

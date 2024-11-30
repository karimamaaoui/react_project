import { Types } from "mongoose";
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    email: string;
    password: string;
    role: UserRole;
    firstname: string;
    lastname: string;
    profilePicture: string;
    bio: string;
    skills: string[];
    projects: {
        title: string;
        description: string;
        link: string;
    }[];
    socialLinks: {
        github: string;
        linkedin: string;
    };
    followingCount: number;
    posts: Types.ObjectId[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;

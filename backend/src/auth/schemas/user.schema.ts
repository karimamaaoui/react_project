import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Types } from "mongoose";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Schema({
    timestamps: true
})
@ApiTags('users')
export class User {
    @Prop({ unique: [true, 'Duplicate email entered'] })
    @ApiProperty()
    email: string;

    @Prop()
    @ApiProperty()
    password: string;

    @Prop({
        type: String,
        enum: UserRole,
        default: UserRole.USER
    })
    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Prop()
    @ApiProperty()
    @IsOptional()
    firstname: string;

    @Prop()
    @ApiProperty()
    @IsOptional()
    lastname: string;

    // Nouveau champ par Rania
    @Prop()
    @ApiProperty()
    @IsOptional()
    profilePicture: string;

    @Prop()
    @ApiProperty()
    @IsOptional()
    bio: string;

    @Prop()
    @ApiProperty()
    @IsOptional()
    skills: string[];

    @Prop()
    @ApiProperty()
    @IsOptional()
    projects: { title: string, description: string, link: string }[];

    @Prop({
        type: { 
          github: { type: String }, 
          linkedin: { type: String } 
        },
        default: { github: '', linkedin: '' }, 
      })
      @ApiProperty({
        type: Object, 
        description: 'Social links for the user',
        example: { github: 'https://github.com/user', linkedin: 'https://linkedin.com/in/user' }
      })
      @IsOptional()
      socialLinks: { github: string; linkedin: string };
      @ApiProperty({
        example: 7,
        description: `The number of user's followings`,
      })
      followingCount: number;

    @Prop({ type: [Types.ObjectId], ref: 'Post' })
    @ApiProperty()
    @IsOptional()
    posts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

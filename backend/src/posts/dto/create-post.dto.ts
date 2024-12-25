import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePostDto {
  @ApiProperty({ description: 'Author of the post' })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Content of the post' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  isLiked: boolean;

}

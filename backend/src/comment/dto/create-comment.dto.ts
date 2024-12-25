// src/comment/dto/create-comment.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsMongoId } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ description: 'The ID of the post' })
  @IsMongoId()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({ description: 'The ID of the author' })
  @IsMongoId()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

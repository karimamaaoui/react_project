import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateLikeDto {

 @ApiProperty({ description: 'The ID of the post' })
  @IsMongoId()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({ description: 'The ID of the user' })
  @IsMongoId()
  @IsNotEmpty()
  author: string;


}

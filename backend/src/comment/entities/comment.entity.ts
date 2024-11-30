import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
  timestamps: true
})
@ApiTags('comments')
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  @ApiProperty()
  postId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @ApiProperty()
  author: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  content: string;

  @Prop({ default: 0 })
  @ApiProperty()
  likes: number;

}
  export const CommentSchema = SchemaFactory.createForClass(Comment);

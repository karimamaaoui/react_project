import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
  timestamps: true
})
@ApiTags('likes')
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  @ApiProperty()
  postId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  @ApiProperty()
  author: Types.ObjectId;

 
}
  export const LikeSchema = SchemaFactory.createForClass(Like);

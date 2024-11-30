import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>
  ) {}

  // Ajouter un commentaire
  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { postId, author, content } = createCommentDto;
    const comment = new this.commentModel({
      postId,
      author,
      content
    });
    return comment.save();
  }
  // Récupérer tous les commentaires d'un post
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ postId }).exec();
  }

  // Supprimer un commentaire
  async deleteComment(commentId: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(commentId);
  }
}
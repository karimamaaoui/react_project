import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class LikeService {

constructor(
  @InjectModel(Like.name) private likeModel: Model<Like>,
@InjectModel(Post.name) private postModel: Model<Post>
){

}
// Ajouter un like
async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
  const { postId, author } = createLikeDto;

  // Create the Like document
  const like = new this.likeModel({
    postId,
    author,
  });

  // Save the like to the database
  await like.save();

  // Find the post and update the isLiked field to true
  const post = await this.postModel.findById(postId);
  if (post) {
    post.isLiked = true; // Update the isLiked field
    await post.save(); // Save the updated post
  }

  return like;
}
  

  // Supprimer un like
  async deleteLike(likeId: string): Promise<void> {
    await this.likeModel.findByIdAndDelete(likeId);
  }

  
    // Récupérer tous les likes d'un post
    async getLikesByPost(postId: string): Promise<Like[]> {
      return this.likeModel.find({ postId })
      .populate('author', 'firstname lastname profilePicture')
      .exec();
    }
  
}

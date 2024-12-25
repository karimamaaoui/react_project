import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeSchema } from './entities/like.entity';
import { JwtModule } from '@nestjs/jwt';
import { Post, PostSchema } from 'src/posts/entities/post.entity';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema },
        { name: Post.name, schema: PostSchema }, ]),
      JwtModule,  
    ],
   
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

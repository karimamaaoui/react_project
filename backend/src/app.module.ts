import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';


@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env',
      isGlobal: true, 
    }), 
    MongooseModule.forRoot(process.env.URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Directory to serve
      serveRoot: '/uploads', // URL prefix
    }),
    AuthModule,
    PostsModule,
    CommentModule,
    LikeModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

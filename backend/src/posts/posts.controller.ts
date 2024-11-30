import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import {v4 as uuidv4} from 'uuid';
import { Observable, of } from 'rxjs';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
      },
      storage: diskStorage({
        destination: './uploads', // Directory to save the files
        filename: (req, file, cb) => {
          const fileName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, fileName); // Save with unique name
        },
      }),
    }),
  )
  
  @ApiResponse({ status: 201, description: 'Post successfully created.', type: PostEntity })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createPostDto: CreatePostDto,@UploadedFile() file: Express.Multer.File, @Req() req): Promise<PostEntity> {
    console.log("file",file)
    try {
      const imageUrl = file ? `http://localhost:8000/uploads/${file.filename}` : null;      
      createPostDto.author = req.user.id;
      return this.postsService.create({...createPostDto,image: imageUrl,});
    } catch (error) {
      console.error('Error in token decoding:', error);
      throw new UnauthorizedException('Invalid or missing token');
    }
  }
  
 
  @Get('getAll')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all posts.',
    type: [Post],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getAllPosts(
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('order') order: 'desc' = 'desc'  
  ) {
    return this.postsService.getAllPosts(sortBy, order);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getPosts')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user posts.',
    type: [PostEntity],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getPostsByAuthor(@Req() req,@Query('sortBy') sortBy: string = 'createdAt',
  @Query('order') order: 'desc' = 'desc'  ) {
    const userId = req.user.id; 
    console.log("user id",userId)
    return this.postsService.getPostsByUserId(userId,sortBy, order);
  }
  



  @Get('get/:id')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved post.',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Post successfully updated.',
    type: PostEntity,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Post successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}

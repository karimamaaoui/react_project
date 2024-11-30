import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Ajouter un commentaire
  @Post(':postId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Req() req,
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto  
  ) {
    createCommentDto.author = req.user.id;
    console.log("author ", req.user);
    createCommentDto.postId=postId;
    return this.commentService.addComment(createCommentDto);
  }


  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }

  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId);
  }
}
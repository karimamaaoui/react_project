import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';

@ApiTags('likes')
@Controller('likes')
@ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('add/:postId')
  async create(
    @Req() req,
    @Param('postId') postId: string,
    @Body() createLikeDto: CreateLikeDto) {
      createLikeDto.author = req.user.id; 
      console.log("user ", req.user);
      createLikeDto.postId=postId;  
    return this.likeService.createLike(createLikeDto);
  }

  
  @Get(':postId')
  async getLikes(@Param('postId') postId: string) {
    return this.likeService.getLikesByPost(postId);
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
  //   return this.likeService.update(+id, updateLikeDto);
  // }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.likeService.deleteLike(id);
  }
}

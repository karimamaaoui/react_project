import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
      const { token } = await this.authService.login(loginDto, res);
      return res.json({ token }); // Return token as part of the JSON response
    }
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req, @Res() res) {
        const response = await this.authService.signUp(req.user);
        res.redirect(`http://localhost:5173/dashboard?token=${response.token}`);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.authService.create(createUserDto);
    }
  
    @Get('getAll')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved all users.', type: [User] })
    async findAll() {
        return this.authService.findAll();
    }

    @Get('get/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved user.', type: User })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async findById(@Param('id') id: string) {
        return this.authService.findById(id);
    }

    @Patch('update/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User successfully updated.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
     async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.authService.update(id, updateUserDto);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard) 
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User successfully deleted.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    async delete(@Param('id') id: string) {
        return this.authService.delete(id);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Successfully retrieved user profile.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async profile(@Req() req): Promise<User> {
        return this.authService.getProfile(req.user.id);
    }


    @Patch('updateProfile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(
        FileInterceptor('profilePicture', {
          fileFilter: (req, file, cb) => {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (allowedMimeTypes.includes(file.mimetype)) {
              cb(null, true);
            } else {
              cb(new Error('Invalid file type. Only images are allowed.'), false);
            }
          },
          storage: diskStorage({
            destination: './uploads/users', // Directory to save the files
            filename: (req, file, cb) => {
              const fileName = `${Date.now()}${extname(file.originalname)}`;
              cb(null, fileName); // Save with unique name
            },
          }),
        }),
      )
    @ApiResponse({ status: 200, description: 'User profile successfully updated.', type: User })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async updateProfile(@Req() req,@UploadedFile() file: Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
        const imageUrl = file ? `http://localhost:8000/uploads/users/${file.filename}` : null;      
        console.log("imageurl ",imageUrl);
        const userId = req.user.id;
        return this.authService.updateProfile(userId, {
            ...updateUserDto,
            profilePicture:imageUrl,
          });    }
}

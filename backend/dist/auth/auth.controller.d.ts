import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    googleAuth(): Promise<void>;
    googleCallback(req: any, res: any): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
    profile(req: any): Promise<User>;
    updateProfile(req: any, file: Express.Multer.File, updateUserDto: UpdateUserDto): Promise<User>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const post_entity_1 = require("../posts/entities/post.entity");
let AuthService = class AuthService {
    constructor(userModel, postModel, jwtService, configService) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(signUpDto) {
        const { email, password, role } = signUpDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            role,
        });
        const token = this.jwtService.sign({ id: user._id }, { secret: this.configService.get('JWT_SECRET') });
        return { token };
    }
    async login(loginDto, res) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Email is incorrect');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Password is incorrect');
        }
        const token = this.jwtService.sign({ id: user._id,
            role: user.role,
            email: user.email
        }, { secret: this.configService.get('JWT_SECRET') });
        res.cookie('jwt', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        return { token };
    }
    async validateGoogleUser(googleUser) {
        const user = await this.userModel.findOne({ email: googleUser.email });
        if (user)
            return user;
        return await this.userModel.create(googleUser);
    }
    async create(createUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findById(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    async addPostToUser(userId, createPostDto) {
        const userObjectId = mongoose_2.Types.ObjectId.isValid(userId)
            ? new mongoose_2.Types.ObjectId(userId)
            : userId;
        const user = await this.userModel.findById(userObjectId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const newPost = new this.postModel({
            ...createPostDto,
            author: userObjectId,
        });
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        return newPost;
    }
    async updateProfile(userId, updateUserDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateUserDto.firstname)
            user.firstname = updateUserDto.firstname;
        if (updateUserDto.lastname)
            user.lastname = updateUserDto.lastname;
        if (updateUserDto.profilePicture)
            user.profilePicture = updateUserDto.profilePicture;
        if (updateUserDto.bio)
            user.bio = updateUserDto.bio;
        if (updateUserDto.skills)
            user.skills = updateUserDto.skills;
        if (updateUserDto.projects)
            user.projects = updateUserDto.projects;
        await user.save();
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
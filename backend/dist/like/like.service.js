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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const like_entity_1 = require("./entities/like.entity");
const post_entity_1 = require("../posts/entities/post.entity");
let LikeService = class LikeService {
    constructor(likeModel, postModel) {
        this.likeModel = likeModel;
        this.postModel = postModel;
    }
    async createLike(createLikeDto) {
        const { postId, author } = createLikeDto;
        const like = new this.likeModel({
            postId,
            author,
        });
        await like.save();
        const post = await this.postModel.findById(postId);
        if (post) {
            post.isLiked = true;
            await post.save();
        }
        return like;
    }
    async deleteLike(likeId) {
        await this.likeModel.findByIdAndDelete(likeId);
    }
    async getLikesByPost(postId) {
        return this.likeModel.find({ postId })
            .populate('author', 'firstname lastname profilePicture')
            .exec();
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_entity_1.Like.name)),
    __param(1, (0, mongoose_1.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LikeService);
//# sourceMappingURL=like.service.js.map
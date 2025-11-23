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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = __importDefault(require("./post.entity"));
const typeorm_2 = require("typeorm");
let PostsService = class PostsService {
    postsRepository;
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    getAllPosts() {
        return this.postsRepository.find();
    }
    async getPostById(id) {
        const post = await this.postsRepository.findOneBy({ id });
        if (!post) {
            throw new common_2.HttpException('Post not found', common_3.HttpStatus.NOT_FOUND);
        }
        return post;
    }
    async createPost(post) {
        try {
            const newPost = this.postsRepository.create(post);
            await this.postsRepository.save(newPost);
            return newPost;
        }
        catch {
            throw new common_2.HttpException('Failed to create new Post', common_3.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async replacePost(id, post) {
        const existingPost = await this.postsRepository.findOneBy({ id });
        if (!existingPost) {
            throw new common_2.HttpException('Post not found', common_3.HttpStatus.NOT_FOUND);
        }
        const updatedPost = await this.postsRepository.update(id, post);
        return updatedPost;
    }
    async deletePost(id) {
        const existingPost = await this.postsRepository.delete(id);
        if (!existingPost.affected) {
            throw new common_2.HttpException('Post not found', common_3.HttpStatus.NOT_FOUND);
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
exports.default = PostsService;
//# sourceMappingURL=posts.service.js.map
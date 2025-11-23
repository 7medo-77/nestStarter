import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Post from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class PostsService {
  public constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async createPost(post: CreatePostDto) {
    try {
      const newPost = this.postsRepository.create(post);
      await this.postsRepository.save(newPost);
      return newPost;
    } catch {
      throw new HttpException(
        'Failed to create new Post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async replacePost(id: number, post: UpdatePostDto) {
    const existingPost = await this.postsRepository.findOneBy({ id });

    if (!existingPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    const updatedPost = await this.postsRepository.update(id, post);

    return updatedPost;
  }

  async deletePost(id: number) {
    const existingPost = await this.postsRepository.delete(id);
    if (!existingPost.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}

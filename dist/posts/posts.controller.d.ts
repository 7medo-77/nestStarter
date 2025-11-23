import PostsService from './posts.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';
export default class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(): Promise<import("./post.entity").default[]>;
    getPostById(id: string): Promise<import("./post.entity").default>;
    createPost(post: CreatePostDto): Promise<import("./post.entity").default>;
    replacePost(id: string, post: UpdatePostDto): Promise<import("typeorm").UpdateResult>;
    deletePost(id: string): Promise<void>;
}

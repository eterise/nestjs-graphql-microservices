import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private readonly _posts: Post[] = [];

  create(createPostInput: CreatePostInput) {
    this._posts.push(createPostInput);
    return createPostInput;
  }

  findAll() {
    return this._posts;
  }

  findOne(id: string) {
    return this._posts.find((post) => post.id === id);
  }
}

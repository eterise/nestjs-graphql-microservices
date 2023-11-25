import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PrismaService } from 'nestjs-prisma';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createPostInput: CreatePostInput): Promise<Post> {
    const post = await this._create(createPostInput).catch((err) => {
      throw new BadRequestException(err);
    });

    return post;
  }

  private async _create({
    postId,
    title,
    description,
    authorId,
  }: CreatePostInput) {
    return this._prisma.post.create({
      data: {
        postId,
        title,
        description,
        authorId,
      },
      select: {
        postId: true,
        title: true,
        description: true,
        authorId: true,
      },
    });
  }

  public async findAll(): Promise<Post[]> {
    return this._prisma.post.findMany({
      select: {
        postId: true,
        title: true,
        description: true,
        authorId: true,
      },
    });
  }

  public async findOne(postId: string): Promise<Post | null> {
    const post = await this._prisma.post.findUnique({
      where: {
        postId,
      },
      select: {
        postId: true,
        title: true,
        description: true,
        authorId: true,
      },
    });

    return post;
  }
}

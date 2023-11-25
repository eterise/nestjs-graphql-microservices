import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  postId: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  authorId: string;
}

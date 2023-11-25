import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

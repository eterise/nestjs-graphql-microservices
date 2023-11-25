import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createUserInput: CreateUserInput) {
    const { userId, email } = createUserInput;
    const user = await this.findOne(userId);

    if (user) throw new Error('User with the same id is already exist!');

    if (user && user.email === email)
      throw new Error('User with the same email is already exist!');

    return this._createUser(createUserInput);
  }

  public async findAll(): Promise<User[]> {
    return this._prisma.user.findMany({
      select: {
        userId: true,
        email: true,
        password: true,
      },
    });
  }

  public async findOne(id: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  private async _createUser({
    userId,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const user = await this._prisma.user.create({
      data: {
        userId,
        email,
        password,
      },
      select: {
        userId: true,
        email: true,
        password: true,
      },
    });

    return user;
  }
}

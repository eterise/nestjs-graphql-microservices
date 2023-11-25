import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(createUserInput: CreateUserInput) {
    const { id, email } = createUserInput;
    const user = await this.findOne(id);

    if (user) throw new Error('User with the same id is already exist!');

    if (user && user.email === email)
      throw new Error('User with the same email is already exist!');

    return this._createUser(createUserInput);
  }

  public async findAll(): Promise<User[]> {
    const res = await this._prisma.user.findMany();

    return res.map(({ userId, email, password }) => {
      return {
        id: userId,
        email,
        password,
      };
    });
  }

  public async findOne(id: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    if (!user) return user;

    const { userId, email, password } = user;

    return {
      id: userId,
      email,
      password,
    };
  }

  private async _createUser({
    id: userId,
    email,
    password,
  }: CreateUserInput): Promise<User> {
    const res = await this._prisma.user.create({
      data: {
        userId,
        email,
        password,
      },
    });

    return {
      id: res.userId,
      email,
      password,
    };
  }
}

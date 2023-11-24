import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly _users: User[] = [];

  create(createUserInput: CreateUserInput) {
    const user = this.findOne(createUserInput.id);
    if (user) throw new Error('User with the same email is already exist!');

    this._users.push(createUserInput);
    return createUserInput;
  }

  findAll() {
    return this._users;
  }

  findOne(id: string) {
    return this._users.find((user) => user.id === id);
  }
}

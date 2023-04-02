import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-users.dto';
import { randomUUID } from 'crypto';
import { User } from './entities/users.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      email: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      email: 'jorge@mail.com',
      password: '$2b$10$bBfvEB0mT9LWz0KEgybPfe5pPSK5wzxmIQ35.2k2qAvd.NSSlwQym',
    },
  ];

  async getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async getUsers() {
    return this.users.map((user) => {
      return {
        ...user,
        password: undefined,
      };
    });
  }

  async getUserById(id: string) {
    const foundUser = this.users.find((user) => user.id === id);

    if (!foundUser) {
      throw new NotFoundException();
    }

    return new ReturnUserDto(foundUser);
  }

  async createUser(createUserDto: CreateUserDto) {
    const id = randomUUID();

    const { email, password } = createUserDto;

    const userAlreadyExists = await this.getUserByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('Email already in use');
    }

    const salt = 10;
    const passwordHash = await hash(password, salt);
    const newUser: User = new User(id, email, passwordHash);

    this.users.push(newUser);

    return new ReturnUserDto(newUser);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';
import { Repository } from 'typeorm';
import createUserDto from './dto/createUser.dto';

@Injectable()
export default class UsersService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const userResult = await this.userRepository.findOneBy({ email });
    if (!userResult) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userResult;
  }

  async create(user: createUserDto) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch {
      throw new HttpException(
        'Failed to create new User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

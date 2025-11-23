import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import LogInDto from './dto/login.dto';
import PostgresErrorCode from 'src/database/postgresErrorcode.enum';

@Injectable()
export class AuthenticationService {
  public constructor(private readonly userService: UsersService) {}

  async register(registerData: RegisterDto) {
    const {password, ...rest} = registerData;
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    try {
      const newUser = await this.userService.create({
        ...rest,
        password: hashedPassword,
      });
      const newUserWithoutPassword = {...newUser, password: undefined};
      return newUserWithoutPassword;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Registration failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginData: LogInDto) {
  }

}
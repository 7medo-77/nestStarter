import User from './user.entity';
import { Repository } from 'typeorm';
import createUserDto from './dto/createUser.dto';
export default class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getByEmail(email: string): Promise<User>;
    create(user: createUserDto): Promise<User>;
}

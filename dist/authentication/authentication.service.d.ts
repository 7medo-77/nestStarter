import UsersService from "src/users/users.service";
import RegisterDto from "./dto/register.dto";
export declare class AuthenticationService {
    private readonly userService;
    constructor(userService: UsersService);
    register(registerData: RegisterDto): Promise<void>;
}

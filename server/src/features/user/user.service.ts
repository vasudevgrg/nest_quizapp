import { Injectable, UnauthorizedException } from '@nestjs/common';
import { dataSource } from 'ormconfig';
import { User } from 'src/domain/user/user.entity';
import { LoginDto, UserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  userRepository = dataSource.getRepository(User);

  async createUser(user: UserDto): Promise<User> {
    const new_user = await this.userRepository.save(user);
    return new_user;
  }

  async getusers(): Promise<Array<User>> {
    const users = await this.userRepository.find();
    return users;
  }

  async login({ email, password }: LoginDto): Promise<UserDto> {
    const user = await dataSource
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email= :email', { email })
      .getOne();

      if(!user){
        throw new UnauthorizedException('Invalid credentials');
      }

console.log(user.password);
console.log(password);
      if((String)(user.password)=== (String)(password)) {
        console.log("inside verified");
        return user;
      }else{
        throw new UnauthorizedException('Invalid credentials');
      }
  }
}

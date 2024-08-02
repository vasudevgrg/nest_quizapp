import { Injectable } from '@nestjs/common';
import { dataSource } from 'ormconfig';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserService {
  userRepository = dataSource.getRepository(User);

  async createUser(user: User): Promise<User> {
    const new_user = await this.userRepository.save(user);
    return new_user;
  }

  async getusers(): Promise<Array<User>> {
    const users = await this.userRepository.find();
    return users;
  }
}

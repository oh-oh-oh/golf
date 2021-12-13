import { Service } from 'typedi';
import { User } from '../models';

@Service()
class UserService {
  constructor() {}

  async find(): Promise<User> {
    return { id: 1, username: 'tim', password: '123' };
  }
}

export default UserService

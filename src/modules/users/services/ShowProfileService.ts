import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Customer not found.');
    }

    return user;
  }
}

export default ShowProfileService;

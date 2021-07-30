import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  password: string;
  email: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateUserSessionService {
  public async execute({ password, email }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email is not registered.', 401);
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new AppError('Password incorrect.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateUserSessionService;

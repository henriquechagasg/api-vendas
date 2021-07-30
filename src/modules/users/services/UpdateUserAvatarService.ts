import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';

import { getCustomRepository } from 'typeorm';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
      const filename = await s3Provider.saveFile(avatarFileName);
      user.avatar = filename;
    } else {
      const diskProvider = new DiskStorageProvider();
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }
      const filename = await diskProvider.saveFile(avatarFileName);
      user.avatar = filename;
    }

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;

import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    if (!request.file) {
      throw new AppError("Your request doesn't have a file.");
    }
    const updateAvatar = new UpdateUserAvatarService();
    const user = await updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}

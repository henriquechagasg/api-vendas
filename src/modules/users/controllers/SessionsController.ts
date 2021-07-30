import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserSessionService from '../services/CreateSessionService';

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserSession = new CreateUserSessionService();
    const user = await createUserSession.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}

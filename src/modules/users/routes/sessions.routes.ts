import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsControllers from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

//Create User Session
sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsControllers.create,
);

export default sessionsRouter;

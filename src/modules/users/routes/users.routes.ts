import multer from 'multer';
import uplodaConfig from '@config/upload';
import UsersControllers from '../controllers/UsersControllers';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const usersAvatarController = new UserAvatarController();

const upload = multer(uplodaConfig.multer);

//Get all users
usersRouter.get('/', isAuthenticated, usersControllers.index);

// Create new user
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersControllers.create,
);

// Update User Avatar
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;

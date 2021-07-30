import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import '@shared/typeorm';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server error',
    });
  },
);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server running on port 3333. 🏆');
});

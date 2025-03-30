import express, {Express} from 'express';
import {HttpStatus} from './core/types/httpStatuses';
import {videosRouter} from './videos/routers/videos.router';
import {testingRouter} from './testing/routers/testing.router';
import {setupSwagger} from './core/swagger/setupSwagger';
 
export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (_, res) => {
    res.status(HttpStatus.OK_200).send('Hello world!');
  });

  app.use('/videos', videosRouter);
  app.use('/testing', testingRouter);

  setupSwagger(app);
  return app;
};
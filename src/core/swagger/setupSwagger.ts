import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express, {Express} from 'express';

const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Videos API',
      version: '1.0.0',
      description: 'Videos API',
    },
  },
  apis: ['./src/**/*.swagger.yml']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api/docs', express.static(swaggerUiAssetPath));

  app.use(
    '/api',
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerSpec,
      {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css'
      }
    ));
};
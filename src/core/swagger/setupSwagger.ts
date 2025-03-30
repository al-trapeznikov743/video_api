import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express';

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
  /* const swaggerUiOptions = {
    customCss: `
      body {
        background-color: #1e1e1e;
        color: white;
      }
      .swagger-ui .topbar {background-color: #333;}
      .swagger-ui .info {color: white;}
      .swagger-ui .response-col_status_200 {background-color: #2e7d32;}
      .swagger-ui .response-col_status_400 {background-color: #d32f2f;}
      .swagger-ui .response-col_status_500 {background-color: #f44336;}
      .swagger-ui .scheme-container .auth-wrapper .auth {
        color: white;
      }
      .swagger-ui .opblock-summary-path {
        color: #ffffff;
      }
      .swagger-ui .opblock-summary-description {
        color: #e0e0e0;
      }
    `,
    customSiteTitle: 'My API Documentation',
  }; */

  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec, /* swaggerUiOptions */));
};
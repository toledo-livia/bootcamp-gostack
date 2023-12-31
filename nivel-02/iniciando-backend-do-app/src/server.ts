import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';


import uploadConfig from './config/upload';
import routes from './routes';
import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); // Rota para visualizar arquivo
app.use(cors());
app.use(routes);

// Middleware para tratativa global de erros
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // Verificando se o erro foi instanciado do AppError
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message });
    }

    console.error(err);

    // Caso seja um erro desconhecido retorna 500
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});

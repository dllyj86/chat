/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from './routes/api';
import Paths from './routes/constants/Paths';

import EnvVars from './constants/EnvVars';
import HttpStatusCodes from './constants/HttpStatusCodes';

import { NodeEnvs } from './constants/misc';
import { RouteError } from './other/classes';


// **** Variables **** //

const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});


// ** Front-End Content ** //

// Set views directory (html)
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// Set static directory (js and css).

console.log(process.cwd());
console.log(__dirname);

/**
 * 因为server.ts文件不是在项目的根目录.在开发模式和production模式时,执行的时候,路径不一样.
 * 所以这里不可以使用__dirname,而是使用process.cwd()来获取项目的根目录.
 * 通过根目录指定静态文件的路径.
 *  */ 
const staticDir = path.join(process.cwd(), 'dist/public/client');
app.use(express.static(staticDir));

// Route handler to serve the index.html file
app.get('/', (req: Request, res: Response) => {
  
  res.sendFile('index.html', { root: staticDir});
});

app.get('/api', (req, res) => {
  res.send('Hello from Express!').end();
});

// Nav to users pg by default
// app.get('/', (_: Request, res: Response) => {
//   return res.redirect('/users');
// });

// Redirect to login if not logged in.
// app.get('/users', (_: Request, res: Response) => {
//   return res.sendFile('users.html', { root: viewsDir });
// });


// **** Export default **** //

export default app;

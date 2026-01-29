import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from "better-auth/node";
import credentials from '@/src/middleware/credentials';
import cors from 'cors';
import { corsConfig } from '@/src/config/cors-config';
import cookieParser from 'cookie-parser';
import errorHandler from '@/src/middleware/error-handler';
import { authMiddleware } from '@/src/middleware/auth';
import {auth} from '@/src/lib/auth/auth';
import authRoutes from '@/src/routes/auth';
/* routes imports would go here */
 

const app: Application = express();

// Middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

 
// app.use(authMiddleware);

/*
 * Add your routes here
 */

 
// app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/api/auth/', authRoutes);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the TypeScript Express API!",
    status: "online"
  });
});

/* End of routes */

// Custom error handler middleware
app.use(errorHandler);

export default app;
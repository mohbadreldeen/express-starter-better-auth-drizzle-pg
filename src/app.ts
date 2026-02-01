import express, { Application, Request, Response } from "express";
import credentials from "@/src/middleware/credentials";
import cors from "cors";
import { corsConfig } from "@/src/config/cors-config";
import cookieParser from "cookie-parser";
import errorHandler from "@/src/middleware/error-handler";
import v1Router from "./routes/v1/v1";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
/* routes imports would go here */

const app: Application = express();

// Middleware
app.use(express.json());
app.use(credentials);
app.use(cors(corsConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // limit each IP to 50 requests per windowMs
});
app.use(limiter);

/*
 * Add your routes here
 */
app.use("/api/v1/", v1Router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to the TypeScript Express API!",
        status: "online",
    });
});

// Custom error handler middleware
app.use(errorHandler);

export default app;

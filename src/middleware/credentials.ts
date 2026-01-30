import { Request, Response, NextFunction } from "express";
export default function credentials(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const crosDomains = process.env.CORS_ALLOWED_ORIGINS
        ? process.env.CORS_ALLOWED_ORIGINS.split(",")
        : [];
    const origin = req.headers.origin;
    if (crosDomains.includes(origin as string)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
}

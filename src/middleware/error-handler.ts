import { logEvents } from "@/src/lib/log-events";
import { Request, Response, NextFunction } from "express";
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logEvents(`${err.name}: ${err.message}`, "errLog.txt");
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;

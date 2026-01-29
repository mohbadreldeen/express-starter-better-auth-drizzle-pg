import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

interface LogEvent {
    message: string;
    logFileName: string;
}
const logEvents = (message: string, logFileName: string) => {
    const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            fs.mkdirSync(path.join(__dirname, "..", "logs"));
        }
        fs.appendFileSync(
            path.join(__dirname, "..", "..", "logs", logFileName),
            logItem
        );
    } catch (err) {
        console.error(err);
    }
};

// Logger middleware
const logger = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.txt");
    console.log(`${req.method} ${req.path}`);
    next();
};

export { logEvents, logger };

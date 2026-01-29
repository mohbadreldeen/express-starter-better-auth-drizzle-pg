import { logEvents } from '@/src/lib/log-events';

const errorHandler = (err, req, res, next) => {
	logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
	console.error(err.stack);
	res.status(500).json({ message: 'Internal Server Error' });
}

export default errorHandler;
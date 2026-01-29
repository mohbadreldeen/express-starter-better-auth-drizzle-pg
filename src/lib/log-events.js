const { format } = require('date-fns');
const { v4:uuid} = require('uuid');
const fs = require('fs');
const path = require('path');

const logEvents = (message, logFileName) => {
	const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			fs.mkdirSync(path.join(__dirname, '..', 'logs'));
		}
		fs.appendFileSync(path.join(__dirname, '..', 'logs', logFileName), logItem);
	} catch (err) {
		console.error(err);
	}
}

// Logger middleware
const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.txt');
	console.log(`${req.method} ${req.path}`);
	next();
}

module.exports = { logEvents, logger };
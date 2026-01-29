const allowedOrigins = [
  /* 
  * Add your allowed origins here
  */

  'http://localhost:3000',
  'http://localhost:5173'
];

const corsConfig = {
  	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
		} else {
				callback(new Error('Not allowed by CORS'));
		}
	},
    optionsSuccessStatus: 200
};

module.exports = {corsConfig , allowedOrigins};
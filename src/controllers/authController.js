const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 

const {User} = require('../model/user');






const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are required' });
	}
	const foundUser = await User.findOne({ username: username }).exec();
	if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

	const match = bcrypt.compareSync(password, foundUser.password);
	if (match) {
		const cookies = req.cookies;
		// Convert Mongoose Map to plain object
		const roles = foundUser.roles;
		const rolesEntries = [];
		for (let [key, value] of roles) {
			rolesEntries.push(value);
		}
		 

 		const accessToken = jwt.sign(
			{ 
				"userInfo": {
					"username": foundUser.username,
					"roles": rolesEntries
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '10m' }
		);
		
		const newRefreshToken = jwt.sign(
			{ 
				"userInfo": {
					"username": foundUser.username,
					"roles": rolesEntries
				}
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		
		const newRefreshTokenArr = !cookies?.jwt ?
		 			foundUser.refreshToken 
					: foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

		if(cookies?.jwt) {
			res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		}

		foundUser.refreshToken = [...newRefreshTokenArr, newRefreshToken];
		await foundUser.save();

		
		// Send the refresh token as an HTTP-only cookie
		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			sameSite: 'None',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		res.status(200).json({ 
			roles: rolesEntries,
			accessToken,
			message: `Welcome ${username}` });
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}

const logout = async(req, res) => {
	// Since we're not using sessions or tokens, just respond with a message
	 const cookies = req.cookies;
	 if (!cookies?.jwt) return res.sendStatus(204); //No content
	 const refreshToken = cookies.jwt;
	 const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
	 
	 if (foundUser) {
	 	foundUser.refreshToken = [...foundUser.refreshToken.filter(rt => rt !== refreshToken)];	
		await foundUser.save();
	 }
	 res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

	 return res.status(200).json({ message: 'Logged out successfully' });
}

const register = async (req, res) => {

	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are required' });
	}
	const duplicat = await User.findOne({ username: username }).exec();
	if (duplicat) {
	
		return res.status(409).json({ message: 'Username already exists' });
	}

	try {
		const hashedPwd = bcrypt.hashSync(password, 10);
		new User({ 
			username: username,
			password: hashedPwd 
		}).save();
		return res.status(201).json({ message: 'New user registered' });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
}

module.exports = { login, logout, register };
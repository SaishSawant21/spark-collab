import { loginUser, registerUser } from "../services/authService.js";
import { generateWebAccessToken } from "../utils/jwt.js";
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });

export const register = async (req, res) => {
	try {
		const { username, email, password, avatar } = req.body;
		const user = await registerUser(username, email, password, avatar);
		if (user) {
			res.status(200).json({
				code: 200,
				message: 'User registered successfully'
			});
		}
	} catch (e) {
		next(error);
	}
}

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await loginUser(username, password);
		const accessToken = generateWebAccessToken(user);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			maxAge: Number(process.env.COOKIE_MAX_AGE)
		})
		return res.status(200).json({
			code: 200,
			message: 'Login successful'
		})

	} catch (error) {
		next(error);
	}

}

export const logOut = (req, res) => {
	res.clearCookie('accessToken', {
		httpOnly: true,
		secure: false,
		sameSite: 'lax'
	});
	return res.status(200).json({
		code: 200,
		message: 'Logout Successfully'
	});
}

export const getMe = (req, res) => {
	return res.status(200).json({
		code: 200,
		user: req.user
	});
};

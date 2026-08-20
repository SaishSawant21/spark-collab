import { getProfileService, loginUser, registerUser, updateProfileService } from "../services/authService.js";
import { generateWebAccessToken } from "../utils/jwt.js";
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" });

export const register = async (req, res, next) => {
	try {
		const { username, email, password, avatar } = req.body;
		const user = await registerUser(username, email, password, avatar);
		if (user) {
			res.status(201).json({
				code: 201,
				message: 'Registration successful. Please log in to continue.'
			});
		}
	} catch (e) {
		next(error);
	}
}

export const login = async (req, res, next) => {
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
	console.log(req.user);
	return res.status(200).json({
		code: 200,
		user: req.user
	});
};


export const getProfile = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const user = await getProfileService(userId);
		if (user) {
			res.setHeader('Cache-Control', 'no-store');
			res.status(200).json({
				code: 200,
				message: 'User profile loaded successfully.',
				data: user
			});
		}
	} catch (e) {
		next(error);
	}
}

export const updateProfile = async (req, res) => {
	const userId = req.user.id;
	const userData = req.body;
	let userObj = {
		...userData,
		userId
	}
	const updateProfile = await updateProfileService(userObj);
	return res.status(200).json({
		code: 200,
		message: 'Data updated successfully'
	})
}
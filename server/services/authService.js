import bcrypt from 'bcrypt';
import { checkEmail, checkUsername, createUser, fetchAllUsersModel, getUserByIdModel, resetPasswordModel, saveResetPasswordToken, updateProfileModel, verifyResetTokenModel } from '../models/userModel.js';
import { createError } from '../utils/createError.js';
import { sendResetPasswordEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';
const saltRounds = 10;

export const registerUser = async (username, email, password) => {
	const isUsernameExist = await checkUsername(username);
	const isEmailExist = await checkEmail(email);
	if (isUsernameExist) throw createError('Username already exist', 400);
	if (isEmailExist) throw createError('Email already exist', 400);
	const hashPassword = await bcrypt.hash(password, saltRounds);
	return await createUser(username, email, hashPassword);
}

export const loginUser = async (username, password) => {
	const user = await checkUsername(username);

	if (!user) {
		throw createError("Invalid username or password.", 400);
	}

	const checkPassword = await bcrypt.compare(password, user.password);

	if (!checkPassword) {
		throw createError("Invalid username or password.", 400);
	}

	return user;
};

export const getProfileService = async (userId) => {
	return await getUserByIdModel(userId);
}

export const updateProfileService = async (userData) => {
	const dbData = await getUserByIdModel(userData.userId);
	let { username, email, password } = userData;
	if (!dbData) {
		throw new Error('User not found');
	}
	username = username || dbData.username;
	email = email || dbData.email;
	password = password;
	if (password) {
		const saltRounds = 10;
		password = await bcrypt.hash(userData.password, saltRounds);
	}
	return await updateProfileModel(userData.userId, username, email, password);
}

export const fetchAllUsersService = async (ownerId) => {
	return await fetchAllUsersModel(ownerId);
}

export const forgotPasswordService = async (email) => {
	if (!email) {
		throw createError("Email is required.", 400);
	}
	const user = await checkEmail(email);
	if (!user) {
		throw createError("User not found", 400);
	}
	const resetToken = crypto.randomBytes(32).toString("hex");
	const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	const expiresAt = new Date(
		Date.now() + 30 * 60 * 1000
	);
	await saveResetPasswordToken(
		user.id,
		hashedToken,
		expiresAt
	);
	await sendResetPasswordEmail(email, resetToken);
}

export const verifyResetTokenService = async (token) => {
	if (!token) throw createError('Token is required', 400);
	const hashedToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	const user = await verifyResetTokenModel(hashedToken);

	if (!user) {
		throw createError("Invalid or expired reset token.", 400);
	}

	return user;
}

export const resetPasswordService = async (token, password) => {
	if (!token) {
		throw createError("Reset token is required.", 400);
	}

	if (!password) {
		throw createError("Password is required.", 400);
	}

	const hashedToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");

	const user = await verifyResetTokenModel(hashedToken);

	if (!user) {
		throw createError("Invalid or expired reset token.", 400);
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	await resetPasswordModel(user.id, hashedPassword);

	return true;
};
import bcrypt from 'bcrypt';
import { checkEmail, checkUsername, createUser, fetchAllUsersModel, getUserByIdModel, updateProfileModel } from '../models/userModel.js';
import { createError } from '../utils/createError.js';

const saltRounds = 10;

export const registerUser = async (username, email, password, avatar) => {
	const isUsernameExist = await checkUsername(username);
	const isEmailExist = await checkEmail(email);
	if (isUsernameExist) throw createError('Username already exist', 400);
	if (isEmailExist) throw createError('Email already exist', 400);
	const hashPassword = await bcrypt.hash(password, saltRounds);
	return await createUser(username, email, hashPassword, avatar);
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
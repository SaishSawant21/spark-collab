import bcrypt from 'bcrypt';
import { checkEmail, checkUsername, createUser } from '../models/userModel.js';
const saltRounds = 10;
export const registerUser = async (username, email, password, avatar) => {
    try {
        const isUsernameExist = await checkUsername(username);
        const isEmailExist = await checkEmail(email);
        if (isUsernameExist) throw new error('Username exist');
        if (isEmailExist) throw new error('Email exist');
        const hashPassword = await bcrypt.hash(password, saltRounds);

        return await createUser(username, email, hashPassword, avatar);
    } catch (e) {
        throw e;
    }
}

export const loginUser = async (username, password)=>{
    try {
        const user = await checkUsername(username);
        if(!user) throw new error ('Invalid username or password.');
        const checkPassword = await bcrypt.compare(password, user.password);
        if(checkPassword) return user;
    } catch (e) {
        console.log(e);
        throw new error('Invalid username or password.');
    }
}


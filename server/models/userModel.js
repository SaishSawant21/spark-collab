import db from './../config/db.js';

export const createUser = async (username, email, password) => {
	try {
		const executeQuery = await db.query(`INSERT into users 
            (username, email, password)
            VALUES($1,$2,$3) RETURNING *`,
			[username, email, password]
		);
		return executeQuery.rows[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export const checkEmail = async (email) => {
	try {
		const result = await db.query(`
			SELECT id, username, email, password
			FROM users
			WHERE email = $1
			`,
			[email]
		);
		return result.rows[0];
	} catch (error) {
		throw error;
	}
}

export const checkUsername = async (username) => {
	try {
		const result = await db.query(`SELECT * FROM users where username=$1`,
			[username]
		);
		return result.rows[0];
	} catch (error) {
		throw error;
	}
}

export const getUserByIdModel = async (userId) => {
	const result = await db.query(`SELECT id, username, email FROM users
         WHERE id=$1`, [userId]);
	return result.rows[0];
}
export const updateProfileModel = async (userId, username, email, password = null) => {
	const fields = ['username = $1', 'email = $2'];
	const values = [username, email];

	// Only update password if a value is provided
	if (password) {
		values.push(password);
		fields.push(`password = $${values.length}`);
	}

	// Add userId as the final parameter for WHERE clause
	values.push(userId);
	const query = `
    UPDATE users 
    SET ${fields.join(', ')} 
    WHERE id = $${values.length} 
    RETURNING *`;

	const result = await db.query(query, values);
	return result.rows[0];
};

export const fetchAllUsersModel = async (ownerId) => {
	const result = await db.query(`SELECT id, username, email from users
        WHERE id != $1`, [ownerId]);
	return result.rows;
}

export const saveResetPasswordToken = async (
	userId,
	hashedToken,
	expiresAt
) => {
	const result = await db.query(
		`UPDATE users
     SET reset_password_token = $1,
         reset_password_expires_at = $2
     WHERE id = $3
     RETURNING id`,
		[hashedToken, expiresAt, userId]
	);

	return result.rows[0];
};
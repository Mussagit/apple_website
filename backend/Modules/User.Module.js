import dbPool from "../config/pool.js";

// ! Create User
export async function createUser(user_name, user_password) {
	const query = `
        INSERT INTO user_table 
        (user_name, user_password) 
        VALUES (?, ?)
    `;
	const [result] = await dbPool.query(query, [user_name, user_password]);
	return result;
}

// ! Create User (Used inside Transactions with a shared connection)
export async function createUserWithConnection(
	connection,
	user_name,
	user_password,
) {
	const query = `
        INSERT INTO user_table 
        (user_name, user_password) 
        VALUES (?, ?)
    `;
	const [result] = await connection.query(query, [user_name, user_password]);
	return result;
}

// ! Get All Users
export async function getUsers() {
	const query = `SELECT user_id, user_name FROM user_table`;
	const [result] = await dbPool.query(query);
	return result;
}

// ! Get User by ID
export async function getUserById(user_id) {
	const query = `SELECT user_id, user_name FROM user_table WHERE user_id = ?`;
	const [result] = await dbPool.query(query, [user_id]);
	return result[0];
}

// ! Get User by Username (Useful for login/authentication)
export async function getUserByUsername(user_name) {
	const query = `SELECT * FROM user_table WHERE user_name = ?`;
	const [result] = await dbPool.query(query, [user_name]);
	return result[0];
}

// ! Update User by ID
export async function updateUserById(user_id, user_name, user_password) {
	const query = `
        UPDATE user_table 
        SET user_name = ?, 
            user_password = ? 
        WHERE user_id = ?
    `;
	const [result] = await dbPool.query(query, [
		user_name,
		user_password,
		user_id,
	]);
	return result;
}

// ! Delete User by ID
export async function deleteUserById(user_id) {
	const query = `DELETE FROM user_table WHERE user_id = ?`;
	const [result] = await dbPool.query(query, [user_id]);
	return result;
}

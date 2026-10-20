import "dotenv/config";
import mysql from "mysql2/promise";
console.log("Connecting with user:", process.env.DB_USER);
console.log("Connecting to database:", process.env.DB_NAME);
const dbPool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	connectTimeout: 10000,
	ssl:
		process.env.DB_SSL === "true" || process.env.DB_SSL === "require"
			? { rejectUnauthorized: false }
			: undefined,
});


export default dbPool;

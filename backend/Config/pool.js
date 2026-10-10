import "dotenv/config";
import mysql from "mysql2/promise";
console.log("Connecting with user:", process.env.DB_USER);
console.log("Connecting to database:", process.env.DB_NAME);
const dbPool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	connectTimeout: 5000,
});

export default dbPool;

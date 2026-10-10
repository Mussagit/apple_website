import mysql from "mysql2/promise";
import dotenv from "dotenv/config";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSqlFile(connection, filePath) {
	const fileContent = await fs.readFile(filePath, "utf8");
	await connection.query(fileContent);
}

export async function initDB() {
	let dbConnection;
	const DB_NAME = process.env.DB_NAME;
	try {
		dbConnection = await mysql.createConnection({
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			multipleStatements: true, // <-- This allows executing the whole file at once
		});
		console.log("Database Connection successfully connected!");

		await dbConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
		console.log(`${DB_NAME} has successfully created!`);

		await dbConnection.query(`USE ${DB_NAME}`);
		console.log(`${DB_NAME} in use ....`);

		await runSqlFile(dbConnection, path.join(__dirname, "schema.sql"));
		console.log("All tables created successfully!");
	} catch (error) {
		console.log("Error initializing database:", error);
	} finally {
		if (dbConnection) {
			await dbConnection.end();
		}
	}
}

initDB();

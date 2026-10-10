import dbPool from "./pool.js";
import bcrypt from "bcryptjs";

async function seedDatabase() {
	try {
		console.log("🚀 Starting database seeding...");
		const hashedAdminPassword = await bcrypt.hash("123456", 10);

		// ==========================================
		// 1. Insert Products
		// ==========================================

		await dbPool.query(`
			INSERT INTO product_table
				(product_id, product_name, product_url)
			VALUES
				(
					1,
					'iPhone SE',
					'https://www.apple.com/in/iphone-se/'
				),
				(
					2,
					'iPhone 11',
					'https://www.apple.com/in/iphone-11/'
				),
				(
					3,
					'iPhone 11 Pro',
					'https://support.apple.com/en-in/111879'
				)
			ON DUPLICATE KEY UPDATE
				product_name = VALUES(product_name),
				product_url = VALUES(product_url);
		`);

		console.log("✅ Products seeded successfully.");

		// ==========================================
		// 2. Insert Product Descriptions
		// ==========================================

		await dbPool.query(`
			INSERT INTO product_description_table
				(
					description_id,
					product_id,
					product_brief_description,
					product_description,
					product_img,
					product_link
				)
			VALUES
				(
					1,
					3,
					'Pro cameras. Pro display. Pro performance.',
					'A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
					'https://d3v4ckszie160z.cloudfront.net/assets/documents/fullstack-web-application-development/class-contents/imageone-content-1764069182371.jpeg',
					'https://support.apple.com/en-in/111879'
				),
				(
					2,
					2,
					'Lots to love. Less to spend.',
					'You can either pay for your new iPhone in full or pay monthly with carrier financing, iPhone Payments, the iPhone Upgrade Program, and now Apple Card Monthly Installments. Your carrier service plan will be charged separately. Just choose the option that works for you.',
					'https://d3v4ckszie160z.cloudfront.net/assets/documents/fullstack-web-application-development/class-contents/imagetwo-content-1764069228856.jpeg',
					'https://www.apple.com/in/iphone-11/'
				),
				(
					3,
					1,
					'Lots to love. Less to spend.',
					'iPhone SE packs our most powerful chip into our most popular size at our most affordable price. It is just what you have been waiting for.',
					'https://d3v4ckszie160z.cloudfront.net/assets/documents/fullstack-web-application-development/class-contents/imagethree-content-1764069251129.jpeg',
					'https://www.apple.com/in/iphone-se/'
				)
			ON DUPLICATE KEY UPDATE
				product_id = VALUES(product_id),
				product_brief_description = VALUES(product_brief_description),
				product_description = VALUES(product_description),
				product_img = VALUES(product_img),
				product_link = VALUES(product_link);
		`);

		console.log("✅ Product descriptions seeded successfully.");

		// ==========================================
		// 3. Insert Product Prices
		// ==========================================

		await dbPool.query(`
			INSERT INTO product_price_table
				(
					price_id,
					product_id,
					starting_price,
					price_range
				)
			VALUES
				(
					1,
					1,
					'$399',
					'From $9.54/mo. or $229 with trade-in.'
				),
				(
					2,
					2,
					'$449',
					'From $18.70/mo. or $449 with trade-in.'
				),
				(
					3,
					3,
					'$679',
					'From $28.29/mo. or $679 with trade-in.'
				)
			ON DUPLICATE KEY UPDATE
				product_id = VALUES(product_id),
				starting_price = VALUES(starting_price),
				price_range = VALUES(price_range);
		`);

		console.log("✅ Product prices seeded successfully.");

		// ==========================================
		// 4. Insert Users (Admin @mussa with hashed password)
		// ==========================================

		await dbPool.query(`
			INSERT INTO user_table
				(
					user_id,
					user_name,
					user_password
				)
			VALUES
				(
					1,
					'@mussa',
					'${hashedAdminPassword}'
				),
				(
					2,
					'mussa',
					'${hashedAdminPassword}'
				)
			ON DUPLICATE KEY UPDATE
				user_name = VALUES(user_name),
				user_password = VALUES(user_password);
		`);

		console.log("✅ Admin users (@mussa) seeded with bcrypt hash successfully.");

		// ==========================================
		// 5. Insert Orders
		// ==========================================

		await dbPool.query(`
			INSERT INTO orders_table
				(
					order_id,
					product_id,
					user_id
				)
			VALUES
				(
					1,
					2,
					1
				)
			ON DUPLICATE KEY UPDATE
				product_id = VALUES(product_id),
				user_id = VALUES(user_id);
		`);

		console.log("✅ Orders seeded successfully.");

		// ==========================================
		// Finished
		// ==========================================

		console.log("🎉 Database seeding completed successfully!");

		process.exit(0);
	} catch (error) {
		console.error("❌ Error seeding database:", error);

		process.exit(1);
	}
}

seedDatabase();

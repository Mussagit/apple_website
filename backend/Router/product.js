router.post("/add-product", (req, res) => {
	const {
		product_name,
		product_url,
		product_brief_description,
		product_description,
		product_img,
		product_link,
		starting_price,
		price_range,
	} = req.body;

	// Backend Validation Check
	if (!product_name || !product_url || !starting_price) {
		return res.status(400).json({
			message:
				"Validation Error: Product name, URL, and starting price are required.",
		});
	}

	const query = `INSERT INTO products (product_name, product_url, brief_description, full_description, image_url, product_link, starting_price, price_range) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

	const values = [
		product_name,
		product_url,
		product_brief_description,
		product_description,
		product_img,
		product_link,
		starting_price,
		price_range,
	];

	db.query(query, values, (err, result) => {
		if (err) {
			console.error("Error inserting data:", err);
			return res
				.status(500)
				.json({ message: "Server error while saving product." });
		}

		res.status(200).json({
			message: "Full product created successfully!",
			product_id: result.insertId,
		});
	});
});

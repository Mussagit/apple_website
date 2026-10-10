import {
	createDescription,
	updateDescriptionById,
	getDescriptions,
	deleteDescriptionById,
	createMultipleDescriptions,
	getDescriptionByProductId,
} from "../modules/Discription.Module.js";

export async function insertDescriptions(req, res) {
	try {
		const body = req.body;

		// ! Check if the incoming request is an array (multiple descriptions)
		if (Array.isArray(body)) {
			const descriptionValues = body.map((d) => [
				d.product_id,
				d.product_brief_description,
				d.product_description,
				d.product_img,
				d.product_link,
			]);
			const result = await createMultipleDescriptions(descriptionValues);

			return res.status(200).json({
				message: "Descriptions created successfully",
				result,
			});
		}

		// ! Otherwise, handle it as a single description insertion
		const {
			product_id,
			product_brief_description,
			product_description,
			product_img,
			product_link,
		} = body;

		const description = await createDescription(
			product_id,
			product_brief_description,
			product_description,
			product_img,
			product_link,
		);

		res.status(200).json({
			message: "Description created successfully",
			description,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to create description(s)",
		});
	}
}

export async function fetchDescriptions(req, res) {
	try {
		const descriptions = await getDescriptions();

		res.status(200).json({
			message: "Descriptions retrieved successfully",
			descriptions,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve descriptions",
		});
	}
}

export async function fetchDescriptionByProductId(req, res) {
	try {
		const { product_id } = req.params;
		const descriptions = await getDescriptionByProductId(product_id);

		res.status(200).json({
			message: "Description retrieved successfully",
			descriptions,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to retrieve description",
		});
	}
}

// ! Update Description
export async function updateDescription(req, res) {
	try {
		const { description_id } = req.params;
		const {
			product_id,
			product_brief_description,
			product_description,
			product_img,
			product_link,
		} = req.body;

		const result = await updateDescriptionById(
			description_id,
			product_id,
			product_brief_description,
			product_description,
			product_img,
			product_link,
		);

		res.status(200).json({
			message: "Description updated successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to update description",
		});
	}
}

//! Delete Description
export async function deleteDescription(req, res) {
	try {
		const { description_id } = req.params;
		const result = await deleteDescriptionById(description_id);
		res.status(200).json({
			message: "Description deleted successfully",
			result,
		});
	} catch (error) {
		console.log("Error", error);
		res.status(500).json({
			message: "Failed to delete description",
		});
	}
}

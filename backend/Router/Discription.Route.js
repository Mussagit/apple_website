import express from "express";
import {
	insertDescriptions,
	fetchDescriptions,
	fetchDescriptionByProductId,
	updateDescription,
	deleteDescription,
} from "../Controller/Discription.Controller.js";

const router = express.Router();

// ! Route to create single or multiple descriptions
router.post("/", insertDescriptions);

// ! Route to fetch all descriptions
router.get("/", fetchDescriptions);

// ! Route to fetch description(s) by product ID
router.get("/:product_id", fetchDescriptionByProductId);

// ! Route to update a description by description ID
router.put("/:description_id", updateDescription);

// ! Route to delete a description by description ID
router.delete("/:description_id", deleteDescription);

export default router;

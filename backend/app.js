import express from "express";
import cors from "cors";
import descriptionRoute from "./Router/Discription.Route.js";
import priceRoute from "./Router/Price.Route.js";
import ordersRoute from "./Router/Order.Route.js";
import productRoute from "./Router/Prodact.Route.js";
import userRoute from "./Router/User.Route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Products routes
app.use("/api/product", productRoute);
app.use("/api/products", productRoute);
app.use("/api", productRoute);

// Other entities
app.use("/api/description", descriptionRoute);
app.use("/api/price", priceRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/users", userRoute);

export default app;

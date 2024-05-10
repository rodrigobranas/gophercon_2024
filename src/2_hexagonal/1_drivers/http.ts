import express from "express";
import OrderService from "../2_application_hexagon/OrderService";
import { DatabaseAdapter } from "../3_resources/Database";
const app = express();
app.use(express.json());

app.post("/checkout", async function (req: any, res: any) {
	try {
		const database = new DatabaseAdapter();
		const orderService = new OrderService(database);
		const output = await orderService.checkout(req.body);
		res.json(output);
	} catch (e: any) {
		res.status(422).json({ message: e.message });
	}
});

app.listen(3000);

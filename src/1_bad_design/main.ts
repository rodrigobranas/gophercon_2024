import express from "express";
import pgp from "pg-promise";
import crypto from "crypto";
const app = express();
app.use(express.json());

app.post("/checkout", async function (req: any, res: any) {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	if (!req.body.email.match(/^(.+)@(.+)$/)) {
		return res.status(422).json({ message: "Invalid email" });
	}
	const orderId = crypto.randomUUID();
	let total = 0;
	let freight = 0;
	for (const item of req.body.items) {
		if (item.quantity <= 0) {
			return res.status(422).json({ message: "Quantity must be positive" });
		}
		const [product] = await connection.query("select * from branas.product where product_id = $1", [item.productId]);
		if (product) {
			total += parseFloat(product.price) * item.quantity;
			const volume = (product.width/100) * (product.height/100) * (product.length/100);
			const density = parseFloat(product.weight)/volume;
			const itemFreight = 1000 * volume * (density/100);
			freight += ((itemFreight >= 10) ? itemFreight : 10) * item.quantity;
			await connection.query("insert into branas.item (order_id, product_id, price, quantity) values ($1, $2, $3, $4)", [orderId, item.productId, parseFloat(product.price), item.quantity]);
		} else {
			return res.status(422).json({ message: "Product not found" });
		}
	}
	let coupon;
	if (req.body.coupon) {
		[coupon] = await connection.query("select * from branas.coupon where code = $1", [req.body.coupon]);
		const today = new Date();
		if (coupon && (coupon.expire_date.getTime() > today.getTime())) {
			total -= (total * coupon.percentage)/100;
		}
	}
	await connection.query("insert into branas.order (order_id, coupon_code, email, total, freight) values ($1, $2, $3, $4, $5)", [orderId, coupon?.code, req.body.email, total, freight]);
	await connection.$pool.end();
	res.json({
		orderId,
		total,
		freight
	});
});

app.listen(3000);
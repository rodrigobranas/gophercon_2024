import crypto from "crypto";
import DatabasePort from "../3_resources/Database";

export default class OrderService {

	constructor (readonly database: DatabasePort) {

	}

	async checkout (input: any) {
		if (!input.email.match(/^(.+)@(.+)$/)) {
			throw new Error("Invalid email");
		}
		const order = {
			orderId: crypto.randomUUID(),
			email: input.email,
			total: 0,
			freight: 0,
			coupon: ""
		}
		for (const item of input.items) {
			if (item.quantity <= 0) {
				throw new Error("Quantity must be positive");
			}
			const product = await this.database.getProduct(item.productId);
			if (product) {
				await this.addItemToOrder(product, order, item);
			} else {
				throw new Error("Product not found");
			}
		}
		if (input.coupon) {
			await this.applyCouponToOrder(order, input.coupon);
		}
		await this.database.saveOrder(order);
		return order;
	}
	
	async addItemToOrder (product: any, order: any, item: any) {
		order.total += parseFloat(product.price) * item.quantity;
		const volume = (product.width/100) * (product.height/100) * (product.length/100);
		const density = parseFloat(product.weight)/volume;
		const itemFreight = 1000 * volume * (density/100);
		order.freight += ((itemFreight >= 10) ? itemFreight : 10) * item.quantity;
		await this.database.saveItem({ orderId: order.orderId, productId: item.productId, price: parseFloat(product.price), quantity: item.quantity });
	}
	
	async applyCouponToOrder (order: any, code: string) {
		const coupon = await this.database.getCoupon(code);
		const today = new Date();
		if (coupon && (coupon.expire_date.getTime() > today.getTime())) {
			order.total -= (order.total * coupon.percentage)/100;
			order.coupon = coupon.code;
		}
	}
}

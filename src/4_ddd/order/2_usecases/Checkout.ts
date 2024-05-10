import Order from "../1_entities/Order";
import CatalogGateway from "../3_interface_adapters/gateway/ProductGateway";
import CouponRepository from "../3_interface_adapters/repository/CouponRepository";
import OrderRepository from "../3_interface_adapters/repository/OrderRepository";

export default class Checkout {

	constructor (readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository, readonly catalogGateway: CatalogGateway) {
	}

	async execute (input: any) {
		const order = Order.create(input.email);
		for (const item of input.items) {
			const product = await this.catalogGateway.getProduct(item.productId);
			order.addItem(product, item.quantity);
		}
		const coupon = await this.couponRepository.get(input.coupon);
		if (coupon) {
			order.applyCoupon(coupon);
		}
		await this.orderRepository.save(order);
		return {
			orderId: order.orderId,
			total: order.getTotal(),
			freight: order.freight
		};
	}
}
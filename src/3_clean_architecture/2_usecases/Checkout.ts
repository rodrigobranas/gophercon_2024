import Order from "../1_entities/Order";
import CouponRepository from "../3_interface_adapters/repository/CouponRepository";
import OrderRepository from "../3_interface_adapters/repository/OrderRepository";
import ProductRepository from "../3_interface_adapters/repository/ProductRepository";

export default class Checkout {

	constructor (readonly orderRepository: OrderRepository, readonly productRepository: ProductRepository, readonly couponRepository: CouponRepository) {
	}

	async execute (input: any) {
		const order = Order.create(input.email);
		for (const item of input.items) {
			const product = await this.productRepository.get(item.productId);
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
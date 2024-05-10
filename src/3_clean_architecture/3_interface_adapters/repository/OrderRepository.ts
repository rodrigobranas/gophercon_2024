import pgp from "pg-promise";
import Order from "../../1_entities/Order";
import DatabaseConnection from "../../4_frameworks_and_drivers/DatabaseConnection";

export default interface OrderRepository {
	save (order: Order): Promise<void>;
}

export class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async save(order: Order): Promise<void> {
		await this.connection.query("insert into branas.order (order_id, coupon_code, email, total, freight) values ($1, $2, $3, $4, $5)", [order.orderId, order.coupon, order.email, order.getTotal(), order.freight]);
		for (const item of order.items) {
			await this.connection.query("insert into branas.item (order_id, product_id, price, quantity) values ($1, $2, $3, $4)", [order.orderId, item.productId, item.price, item.quantity]);
		}
	}

}

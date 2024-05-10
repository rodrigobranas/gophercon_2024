import pgp from "pg-promise";

export default interface DatabasePort {
	getProduct (productId: number): Promise<any>;
	saveItem (item: any): Promise<void>;
	getCoupon (code: string): Promise<any>;
	saveOrder (order: any): Promise<void>;
}

export class DatabaseAdapter implements DatabasePort {

	async getProduct(productId: number): Promise<any> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [product] = await connection.query("select * from branas.product where product_id = $1", [productId]);
		await connection.$pool.end();
		return product;
	}

	async saveItem(item: any): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into branas.item (order_id, product_id, price, quantity) values ($1, $2, $3, $4)", [item.orderId, item.productId, item.price, item.quantity]);
		await connection.$pool.end();
	}

	async getCoupon(code: string): Promise<any> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [coupon] = await connection.query("select * from branas.coupon where code = $1", [code]);
		await connection.$pool.end();
		return coupon;
	}

	async saveOrder(order: any): Promise<void> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		await connection.query("insert into branas.order (order_id, coupon_code, email, total, freight) values ($1, $2, $3, $4, $5)", [order.orderId, order.coupon, order.email, order.total, order.freight]);
		await connection.$pool.end();
	}

}

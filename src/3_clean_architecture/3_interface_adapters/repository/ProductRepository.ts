import pgp from "pg-promise";
import { Product } from "../../1_entities/Product";
import DatabaseConnection from "../../4_frameworks_and_drivers/DatabaseConnection";

export default interface ProductRepository {
	get (productId: number): Promise<Product>;
}

export class ProductRepositoryDatabase implements ProductRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async get(productId: number): Promise<Product> {
		const [product] = await this.connection.query("select * from branas.product where product_id = $1", [productId]);
		return new Product(product.product_id, product.description, parseFloat(product.price), product.width, product.height, product.length, parseFloat(product.weight));
	}
	
}

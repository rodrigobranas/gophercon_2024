import ProductRepository from "../3_interface_adapters/repository/ProductRepository";

export default class GetProduct {

	constructor (readonly productRepository: ProductRepository) {
	}

	async execute (productId: number) {
		const product = await this.productRepository.get(productId);
		return product;
	}
}
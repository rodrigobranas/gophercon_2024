import ProductRepository from "../3_interface_adapters/repository/ProductRepository";

export default class GetProduct {

	constructor (readonly productRepository: ProductRepository) {
	}

	async execute (productId: number) {
		const product = await this.productRepository.get(productId);
		return {
			productId: product.productId,
			price: product.price,
			width: product.dimensions.width,
			height: product.dimensions.height,
			length: product.dimensions.length,
			weight: product.dimensions.weight,
			volume: product.dimensions.getVolume(),
			density: product.dimensions.getDensity()
		};
	}
}
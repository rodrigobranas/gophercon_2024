import axios from "axios";

export default interface CatalogGateway {
	getProduct (productId: number): Promise<any>;
}

export class CatalogGatewayHttp implements CatalogGateway {

	async getProduct(productId: number): Promise<any> {
		const response = await axios.get(`http://localhost:3001/products/${productId}`);
		return response.data;
	}

}

import GetProduct from "../../2_usecases/GetProduct";
import Checkout from "../../2_usecases/GetProduct";
import HttpServer from "../../4_frameworks_and_drivers/HttpServer";

export default class OrderController {

	constructor (readonly httpServer: HttpServer, readonly getProduct: GetProduct) {
		httpServer.on("get", "/products/:productId", async function (params: any, body: any) {
			const output = await getProduct.execute(params.productId);
			return output;
		});
	}
}
import Checkout from "../../2_usecases/Checkout";
import HttpServer from "../../4_frameworks_and_drivers/HttpServer";

export default class OrderController {

	constructor (readonly httpServer: HttpServer, readonly checkout: Checkout) {
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			const output = await checkout.execute(body);
			return output;
		});
	}
}
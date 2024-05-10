import Checkout from "./2_usecases/Checkout";
import OrderController from "./3_interface_adapters/controller/OrderController";
import { CatalogGatewayHttp } from "./3_interface_adapters/gateway/ProductGateway";
import { CouponRepositoryDatabase } from "./3_interface_adapters/repository/CouponRepository";
import { OrderRepositoryDatabase } from "./3_interface_adapters/repository/OrderRepository";
import DatabaseConnection from "./4_frameworks_and_drivers/DatabaseConnection";
import HttpServer from "./4_frameworks_and_drivers/HttpServer";

const httpServer = new HttpServer();
const databaseConnection = new DatabaseConnection();
const orderRepository = new OrderRepositoryDatabase(databaseConnection);
const couponRepository = new CouponRepositoryDatabase(databaseConnection);
const catalogGateway = new CatalogGatewayHttp();
const checkout = new Checkout(orderRepository, couponRepository, catalogGateway);
new OrderController(httpServer, checkout);
httpServer.listen(3000);

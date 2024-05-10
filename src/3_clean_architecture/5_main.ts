import Checkout from "./2_usecases/Checkout";
import OrderController from "./3_interface_adapters/controller/OrderController";
import { CouponRepositoryDatabase } from "./3_interface_adapters/repository/CouponRepository";
import { OrderRepositoryDatabase } from "./3_interface_adapters/repository/OrderRepository";
import { ProductRepositoryDatabase } from "./3_interface_adapters/repository/ProductRepository";
import DatabaseConnection from "./4_frameworks_and_drivers/DatabaseConnection";
import HttpServer from "./4_frameworks_and_drivers/HttpServer";

const httpServer = new HttpServer();
const databaseConnection = new DatabaseConnection();
const orderRepository = new OrderRepositoryDatabase(databaseConnection);
const productRepository = new ProductRepositoryDatabase(databaseConnection);
const couponRepository = new CouponRepositoryDatabase(databaseConnection);
const checkout = new Checkout(orderRepository, productRepository, couponRepository);
new OrderController(httpServer, checkout);
httpServer.listen(3000);

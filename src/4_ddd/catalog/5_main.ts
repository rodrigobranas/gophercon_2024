import GetProduct from "./2_usecases/GetProduct";
import OrderController from "./3_interface_adapters/controller/ProductController";
import { ProductRepositoryDatabase } from "./3_interface_adapters/repository/ProductRepository";
import DatabaseConnection from "./4_frameworks_and_drivers/DatabaseConnection";
import HttpServer from "./4_frameworks_and_drivers/HttpServer";

const httpServer = new HttpServer();
const databaseConnection = new DatabaseConnection();
const productRepository = new ProductRepositoryDatabase(databaseConnection);
const getProduct = new GetProduct(productRepository);
new OrderController(httpServer, getProduct);
httpServer.listen(3001);
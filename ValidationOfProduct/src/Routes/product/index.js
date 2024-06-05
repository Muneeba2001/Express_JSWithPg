import { Router } from "express";
const productRouter = Router();
import productController from "../../controller/product/index.js";
import AuthValidators from "../../validators/user/index.js"

productRouter.get("/products",AuthValidators.product, productController.getAll)
productRouter.get("/product/:id", productController.getSingle)
productRouter.post("/product", productController.create)
productRouter.put("/product/:id", productController.update)
productRouter.delete("/product/:id", productController.delete)

export default productRouter;
import { Router } from "express";
const saleproductRouter = Router();
import saleproductController from "../../controller/saleProduct/index.js";
import AuthValidators from "../../validators/user/index.js"

saleproductRouter.get("/saleproducts",AuthValidators.saleProduct, saleproductController.getAll)
saleproductRouter.get("/saleproduct/:id", saleproductController.getSingle)
saleproductRouter.post("/saleproduct", saleproductController.create)
saleproductRouter.put("/saleproduct/:id", saleproductController.update)
saleproductRouter.delete("/saleproduct/:id", saleproductController.delete)

export default saleproductRouter;
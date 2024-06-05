import { Router } from "express";
const saleRouter = Router();
import saleController from "../../controller/sale/index.js";
import userAuthMiddleWare from "../../middleware/index.js"

saleRouter.get("/sales", userAuthMiddleWare, saleController.getAll)
saleRouter.get("/sale/:id", saleController.getSingle)
saleRouter.post("/sale", saleController.create)
saleRouter.put("/sale/:id", saleController.update)
saleRouter.delete("/sale/:id", saleController.delete)

export default saleRouter;